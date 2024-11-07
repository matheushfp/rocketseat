import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { MultipleValidationError } from './errors/multiple-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id-1',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toBeInstanceOf(Date)
    expect(checkInsRepository.items[0].validated_at).toBeInstanceOf(Date)
  })

  it('should not be able to validate a non-existent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'non-existent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 10, 7, 13, 15))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id-1',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })

  it('should not be able to validate a check-in more than one time', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id-1',
    })

    await sut.execute({
      checkInId: createdCheckIn.id,
    })

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(MultipleValidationError)
  })
})
