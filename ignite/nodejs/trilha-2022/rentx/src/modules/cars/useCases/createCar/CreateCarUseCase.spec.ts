import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with existing license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Car description",
        daily_rate: 100,
        license_plate: "ABC1234",
        fine_amount: 60,
        brand: "Car brand",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Car description",
        daily_rate: 100,
        license_plate: "ABC1234",
        fine_amount: 60,
        brand: "Car brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with available = true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABCD1234",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
