import { FastifyInstance } from 'fastify'

import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { register } from './controllers/register'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.addHook('onRequest', verifyJWT) // Routes Below this line uses Authentication

  app.get('/me', profile)
}
