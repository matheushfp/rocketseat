import { jest } from "@jest/globals";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJSDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJSDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let dateProvider: DayJSDateProvider;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    dateProvider = new DayJSDateProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory,
    );
  });

  it("Should be able to send an email in case of forgotten password to the user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      email: "abctest@mail.com",
      name: "abc",
      driver_license: "742198",
      password: "123",
    });

    await sendForgotPasswordMailUseCase.execute("abctest@mail.com");

    expect(sendMail).toBeCalled();
  });

  it("Should not be able to send an email if the user doesn't exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("kqerf@mail.com"),
    ).rejects.toEqual(new AppError("User doesn't exists"));
  });

  it("Should be able to create a token for an user", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create",
    );

    await usersRepositoryInMemory.create({
      email: "xyz@mail.com",
      name: "xyz",
      driver_license: "879142",
      password: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("xyz@mail.com");

    expect(generateTokenMail).toBeCalled();
  });
});
