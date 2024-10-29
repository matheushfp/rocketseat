import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersrepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseParams) {
    const userWithSameEmail = await this.usersrepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    const passwordHash = await hash(password, 6)

    await this.usersrepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
