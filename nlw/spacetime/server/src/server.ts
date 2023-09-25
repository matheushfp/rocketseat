import 'dotenv/config'

import fastify from 'fastify'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'
import { access, mkdir } from 'node:fs'

// checking if the directory 'uploads' exists
access(resolve(__dirname, '../uploads'), (err) => {
  if (err) {
    mkdir('uploads', (err) => {
      if (err) {
        throw new Error('Error creating uploads folder')
      }
    })
  }
})

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: process.env.JWT_SECRET as string,
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP Server running at http://localhost:3333')
  })
