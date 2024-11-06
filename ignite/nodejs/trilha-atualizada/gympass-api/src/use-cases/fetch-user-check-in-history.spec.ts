import { beforeEach, describe, expect, it } from 'vitest'

import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-in-history'

let checkInsRepository: CheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      user_id: 'user-id-1',
      gym_id: 'gym-id-1',
    })

    await checkInsRepository.create({
      user_id: 'user-id-1',
      gym_id: 'gym-id-2',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-id-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-1' }),
      expect.objectContaining({ gym_id: 'gym-id-2' }),
    ])
  })

  it('should be able to fetch paginated user check-in history', async () => {
    for (let i = 0; i < 22; i++) {
      await checkInsRepository.create({
        user_id: `user-id-1`,
        gym_id: `gym-id-${i + 1}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-id-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-21' }),
      expect.objectContaining({ gym_id: 'gym-id-22' }),
    ])
  })
})
