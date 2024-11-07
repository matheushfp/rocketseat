import type { CheckIn } from '@prisma/client'
import { differenceInMinutes } from 'date-fns'

import { CheckInsRepository } from '@/repositories/check-ins-repository'

import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { MultipleValidationError } from './errors/multiple-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const differenceInMinutesFromCheckInCreation = differenceInMinutes(
      new Date(),
      checkIn.created_at,
    )

    if (differenceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    if (checkIn.validated_at) {
      throw new MultipleValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
