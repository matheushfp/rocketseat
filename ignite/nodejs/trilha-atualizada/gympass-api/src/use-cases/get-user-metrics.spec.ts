import { beforeEach, describe, expect, it } from 'vitest'

import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: CheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count', async () => {
    await checkInsRepository.create({
      user_id: 'user-id-1',
      gym_id: 'gym-id-1',
    })

    await checkInsRepository.create({
      user_id: 'user-id-1',
      gym_id: 'gym-id-2',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-id-1',
    })

    expect(checkInsCount).toEqual(2)
  })
})
