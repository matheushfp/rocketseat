import { compare, hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      email: z.string().email().toLowerCase(),
      password: z.string(),
    })

    const { data } = createUserBodySchema.safeParse(request.body)

    if(!data) {
      return reply.status(400).send()
    }

    const { email, password } = data

    // Check if this user alreadyExists (email already used)
    const userAlreadyExists = await prisma.user.findFirst({where: {
      email,
    }})

    if(userAlreadyExists) {
      return reply.status(400).send({
        message: 'User already exists',
      })
    }

    const encryptedPassword = await hash(password, 10)

    const user = {
      email,
      password: encryptedPassword, 
    }

    await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
      },
    })

    return reply.status(201).send()
  })

  app.post('/login', async (request, reply) => {
    const userLoginBodySchema = z.object({
      email: z.string().email().toLowerCase(),
      password: z.string(),
    })

    const { data } = userLoginBodySchema.safeParse(request.body)

    if(!data) {
      return reply.status(400).send()
    }

    const { email, password } = data

    // Check if user exists
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if(!userAlreadyExists) {
      // Not return explicitly "user not exists" to avoid attacks
      return reply.status(401).send({
        message: 'The email address or password is incorrect.',
      })
    }

    // Verify if password is correct
    const passwordMatch = await compare(password, userAlreadyExists.password)

    if(!passwordMatch) {
      return reply.status(401).send({
        message: 'The email address or password is incorrect.',
      })
    }

    // Generate JWT
    const token = app.jwt.sign({}, {
      sub: userAlreadyExists.id, 
      expiresIn: '1h',
    })
    
    return {
      token,
    }
  })
}
