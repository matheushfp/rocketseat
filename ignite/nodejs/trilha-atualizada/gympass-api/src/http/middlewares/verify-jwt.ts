import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    if (err instanceof Error) {
      const error = err as FastifyError
      return reply.status(error.statusCode!).send({
        message: error.message,
      })
    }
  }
}
