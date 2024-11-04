import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CheckInUseCase } from './check-in'

let checkInsRepository: CheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-id-1',
      title: 'gym-test-1',
      description: '',
      phone: '',
      latitude: new Decimal(-23.5489),
      longitude: new Decimal(-46.6388),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -23.5489,
      userLongitude: -46.6388,
    })

    expect(checkIn).toHaveProperty('id')
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 10, 1, 14, 0, 0))

    await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -23.5489,
      userLongitude: -46.6388,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-id-1',
        gymId: 'gym-id-1',
        userLatitude: -23.5489,
        userLongitude: -46.6388,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 10, 1, 14, 0, 0))

    await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -23.5489,
      userLongitude: -46.6388,
    })

    vi.setSystemTime(new Date(2024, 10, 2, 14, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-id-1',
      gymId: 'gym-id-1',
      userLatitude: -23.5489,
      userLongitude: -46.6388,
    })

    expect(checkIn).toHaveProperty('id')
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-id-2',
      title: 'gym-test-2',
      description: '',
      phone: '',
      latitude: new Decimal(-23.5533558),
      longitude: new Decimal(-46.6433684),
    })

    await expect(() =>
      sut.execute({
        userId: 'user-id-1',
        gymId: 'gym-id-2',
        userLatitude: -23.5489,
        userLongitude: -46.6388,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
