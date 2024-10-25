import { execSync } from 'node:child_process'

import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { app } from '../src/app'

describe('Users routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
    
  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npx prisma migrate reset --force')
  })

  it('Should be able to create a user', async () => {
    await request(app.server)
      .post('/users')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(201)
  })

  it('Should be able to login', async () => {
    await request(app.server)
      .post('/users')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(201)
    
    const response = await request(app.server)
      .post('/users/login')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(200)
      
    expect(response.body).toHaveProperty('token')
  })

  it('Should not be able to create a user that already exists', async () => {
    await request(app.server)
      .post('/users')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(201)
    
    const response = await request(app.server)
      .post('/users')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(400)
    
    expect(response.body).toHaveProperty('message', 'User already exists')
  })
})
