import { execSync } from 'node:child_process'

import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { app } from '../src/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

beforeEach(() => {
  execSync('npx prisma migrate reset --force')
})

describe('Meals routes', () => {
  it('Should be able to create a new meal', async () => {
    await request(app.server)
      .post('/users')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(201)
  
    const userResponse = await request(app.server)
      .post('/users/login')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(200)
    
    const { token } = userResponse.body

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Meal',
        description: 'Test Description',
        date: new Date(),
        is_on_diet: true,
      }).expect(201)
  })

  it('Should be able to list all meals from a user', async () => {
    await request(app.server)
      .post('/users')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(201)
  
    const userResponse = await request(app.server)
      .post('/users/login')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(200)
    
    const { token } = userResponse.body

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Meal',
        description: 'Test Description',
        date: new Date(),
        is_on_diet: true,
      }).expect(201)

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Meal 2',
        description: 'Test Description 2',
        date: new Date(),
        is_on_diet: false,
      }).expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(mealsResponse.body.meals).toHaveLength(2)
  })

  it('Should be able to list a specific meal', async () => {
    await request(app.server)
      .post('/users')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(201)

    const userResponse = await request(app.server)
      .post('/users/login')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(200)
  
    const { token } = userResponse.body

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Meal',
        description: 'Test Description',
        date: new Date(),
        is_on_diet: true,
      }).expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const mealId = mealsResponse.body.meals[0].id

    const mealResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(mealResponse.body.meal).toHaveProperty('name', 'New Meal')
  })

  it('Should be able to update a meal entirely (PUT)', async () => {
    await request(app.server)
      .post('/users')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(201)
  
    const userResponse = await request(app.server)
      .post('/users/login')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(200)
    
    const { token } = userResponse.body

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Meal',
        description: 'Test Description',
        date: new Date(),
        is_on_diet: true,
      })
      .expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const mealId = mealsResponse.body.meals[0].id

    await request(app.server)
      .put(`/meals/${mealId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal Updated',
        description: 'Description Updated',
        date: new Date(Date.now() + 60 * 60 * 1000), // 1 hour after
        is_on_diet: false,
      })
      .expect(204)    
  })

  it('Should be able to update a meal property (PATCH)', async () => {
    await request(app.server)
      .post('/users')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(201)

    const userResponse = await request(app.server)
      .post('/users/login')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(200)
  
    const { token } = userResponse.body

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Meal',
        description: 'Test Description',
        date: new Date(),
        is_on_diet: true,
      })
      .expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const mealId = mealsResponse.body.meals[0].id

    await request(app.server)
      .patch(`/meals/${mealId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        is_on_diet: false,
      })
      .expect(204)
  })

  it('Should be able to delete a meal', async () => {
    await request(app.server)
      .post('/users')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(201)

    const userResponse = await request(app.server)
      .post('/users/login')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(200)

    const { token } = userResponse.body

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Meal',
        description: 'Test Description',
        date: new Date(),
        is_on_diet: true,
      }).expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const mealId = mealsResponse.body.meals[0].id

    await request(app.server)
      .delete(`/meals/${mealId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })

  it('Should be able to show user metrics', async () => {
    await request(app.server)
      .post('/users')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(201)
  
    const userResponse = await request(app.server)
      .post('/users/login')
      .send({
        email: 'johndoe@example.com',
        password: '1234',
      })
      .expect(200)
    
    const { token } = userResponse.body

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal1',
        description: 'Description1',
        date: new Date(),
        is_on_diet: true,
      }).expect(201)

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal2',
        description: 'Description2',
        date: new Date(Date.now() + 60 * 60 * 1000), // 1 hour after
        is_on_diet: false,
      }).expect(201)
    
    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal3',
        description: 'Description3',
        date: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hour after
        is_on_diet: true,
      }).expect(201)

    await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Meal4',
        description: 'Description4',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day after
        is_on_diet: true,
      }).expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(mealsResponse.body.meals).toHaveLength(4)
    
    const metricsResponse = await request(app.server)
      .get('/meals/metrics')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    
    expect(metricsResponse.body.totalMeals).toEqual(4)
    expect(metricsResponse.body.totalMealsOnDiet).toEqual(3)
    expect(metricsResponse.body.totalMealsOffDiet).toEqual(1)
    expect(metricsResponse.body.bestSequenceOnDiet).toEqual(2)
  })
})
