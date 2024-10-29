import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersrepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseParams) {
    const userAlreadyExists = await this.usersrepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    await this.usersrepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
