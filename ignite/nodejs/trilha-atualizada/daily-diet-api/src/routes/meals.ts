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

  app.get('/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
      
    const params = paramsSchema.safeParse(request.params)
      
    if(!params.success) {
      return reply.status(400).send({
        message: params.error.format(),
      })
    }
      
    const { id } = params.data
    const { sub: userId } = request.user

    const meal = await prisma.meal.findFirst({
      where: {
        id,
        user_id: userId,
      },
    })
  
    return {
      meal,
    }
  },
  )

  app.delete('/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const params = paramsSchema.safeParse(request.params)
      
    if(!params.success) {
      return reply.status(400).send({
        message: params.error.format(),
      })
    }
      
    const { id } = params.data
    const { sub: userId } = request.user

    try{
      await prisma.meal.delete({
        where: {
          id,
          user_id: userId,
        },
      })
    } catch(err) {
      console.error(err)
      return reply.status(404).send({
        message: 'Meal Not Found',
      })
    }
    
    return reply.status(204).send()
  })
}
