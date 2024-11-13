import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '12345678',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@mail.com',
      password: '12345678',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveProperty('user')
    expect(response.body.user).toHaveProperty('id')
    expect(response.body.user).toHaveProperty('name', 'John Doe')
  })
})
