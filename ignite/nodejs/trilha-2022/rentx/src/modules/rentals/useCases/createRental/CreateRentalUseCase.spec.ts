import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayJSDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJSDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJSDateProvider: DayJSDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayPlus24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJSDateProvider = new DayJSDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJSDateProvider,
      carsRepositoryInMemory,
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 45,
      category_id: "category test",
      brand: "car brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expected_return_date: dayPlus24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if the user already has one", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "2222",
      user_id: "12345",
      expected_return_date: dayPlus24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "2345",
        user_id: "12345",
        expected_return_date: dayPlus24Hours,
      }),
    ).rejects.toEqual(new AppError("This user has a rental in progress"));
  });

  it("Should not be able to create a new rental if the car already has one", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayPlus24Hours,
      user_id: "1234",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "4321",
        car_id: "test",
        expected_return_date: dayPlus24Hours,
      }),
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("Should not be able to create a new rental if invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(
      new AppError(
        "Invalid time! The rental time have to be at least 24 hours",
      ),
    );
  });
});
