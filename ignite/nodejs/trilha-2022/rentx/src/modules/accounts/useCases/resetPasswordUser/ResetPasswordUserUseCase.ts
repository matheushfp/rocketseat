import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayJSDateProvider")
    private dateProvider: IDateProvider,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest) {
    const userToken =
      await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token Invalid");
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError("Token Expired");
    }

    const user = await this.usersRepository.findByID(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);
    await this.usersTokensRepository.deleteByID(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
