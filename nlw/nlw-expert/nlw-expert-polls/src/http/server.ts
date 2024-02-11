import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'
import { fastifyWebsocket } from '@fastify/websocket'
import { pollResults } from './ws/poll-results'

const app = fastify()

app.register(cookie, {
  secret: '5b201d74-d7e0-4ef8-9b45-649bbb901cb2',
  hook: 'onRequest',
})

app.register(fastifyWebsocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.register(pollResults)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP Server Running')
})
