import type { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsUseCaseParams {
  userlatitude: number
  userlongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userlatitude,
    userlongitude,
  }: FetchNearbyGymsUseCaseParams): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userlatitude,
      longitude: userlongitude,
    })

    return {
      gyms,
    }
  }
}
