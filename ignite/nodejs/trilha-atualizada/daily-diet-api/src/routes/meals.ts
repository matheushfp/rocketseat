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

    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    })

    if(!meal) {
      return reply.status(404).send()
    }

    // Return Unauthorized if the user didn't create the meal
    if(meal.user_id !== userId) {
      return reply.status(401).send()
    }
  
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

    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    })

    if(!meal) {
      return reply.status(404).send()
    }

    if(meal.user_id !== userId) {
      return reply.status(401).send()
    }

    await prisma.meal.delete({
      where: {
        id,
        user_id: userId,
      },
    })
    
    return reply.status(204).send()
  })

  app.put('/:id', async (request, reply) => {
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

    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    })

    if(!meal) {
      return reply.status(404).send()
    }

    if(meal.user_id !== userId) {
      return reply.status(401).send()
    }

    const updateMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string().datetime(),
      is_on_diet: z.boolean(),
    })

    const body = updateMealBodySchema.safeParse(request.body)

    if(!body.success) {
      return reply.status(400).send({
        message: body.error.format(),
      })
    }

    const { data } = body

    await prisma.meal.update({
      where: {
        id,
        user_id: userId,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    })

    return reply.status(204).send()
  })

  app.patch('/:id', async (request, reply) => {
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

    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    })

    if(!meal) {
      return reply.status(404).send()
    }

    if(meal.user_id !== userId) {
      return reply.status(401).send()
    }

    const updateMealBodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      date: z.string().datetime().optional(),
      is_on_diet: z.boolean().optional(),
    })

    const body = updateMealBodySchema.safeParse(request.body)

    if(!body.success) {
      return reply.status(400).send({
        message: body.error.format(),
      })
    }

    const { data } = body

    if(Object.keys(data).length === 0) {
      return reply.status(400).send({
        message: 
        'At least one should be informed: name, description, date, is_on_diet',
      })
    }

    await prisma.meal.update({
      where: {
        id,
        user_id: userId,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    })

    return reply.status(204).send()
  })
}
