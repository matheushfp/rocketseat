import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to register a user', async () => {
    const { gym } = await sut.execute({
      title: 'gym-01',
      description: null,
      phone: null,
      latitude: -23.5489,
      longitude: -46.6388,
    })

    expect(gym).toHaveProperty('id')
  })
})
