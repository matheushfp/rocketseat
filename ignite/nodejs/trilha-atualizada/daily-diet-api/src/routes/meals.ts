import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { verifyToken } from '../middlewares/verify-token'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyToken)

  app.post('/', async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string().datetime(),
      is_on_diet: z.boolean(),
    })

    const body = createMealBodySchema.safeParse(request.body)

    if(!body.success) {
      return reply.status(400).send({
        message: body.error.format(),
      })
    }

    const { data } = body
    const { sub: userId } = request.user

    await prisma.meal.create({
      data: {
        ...data,
        user_id: userId,
      },
    })

    return reply.status(201).send()   
  })

  app.get('/', async (request) => {
    const {sub: userId} = request.user

    const meals = await prisma.meal.findMany({
      where: {
        user_id: userId,
      },
    })

    return {
      meals,
    }
  })
}
