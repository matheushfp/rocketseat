import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'

import { env } from './env'
import { mealsRoutes } from './routes/meals'
import { usersRoutes } from './routes/users'

export const app = fastify()

app.register(fastifyJwt, { secret: env.JWT_SECRET })
app.register(usersRoutes, { prefix: '/users' })
app.register(mealsRoutes, { prefix: '/meals' })
