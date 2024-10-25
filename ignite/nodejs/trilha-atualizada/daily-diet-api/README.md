# Daily Diet API

This is the second challenge in the updated course of Node.js from Rocketseat.<br>
In this project a API was created using fastify and JWT token were used to identify the corresponding user.<br>
The user can list, update or delete only meals created by him, and can see metrics related to his profile. 

The API can:<br>
☑️  Create a user<br>
☑️  User Login (receive JWT token to use in meals routes)<br>
☑️  Create a meal<br>
☑️  List a specific meal<br>
☑️  List all meals<br>
☑️  Update a meal<br>
☑️  Delete a meal<br>
☑️  Check user metrics<br>

## Tools
- Typescript
- fastify
- zod
- vitest
- supertest
- Prisma

## Quick Start
1. Install the dependencies<br>
   npm: `npm install`<br>
   yarn: `yarn install`<br>
   pnpm: `pnpm install`

2. Create a `.env` file in the root folder:<br>

<b>.env</b>:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=
```

2.1. (Optional) Create a `.env.test` if want to run tests:<br>

<b>.env.test</b>:
```env
DATABASE_URL="file:./test.db"
JWT_SECRET=
```

3. Run database migrations:<br>
   npm: `npx prisma migrate dev`<br>
   yarn: `yarn prisma migrate dev`<br>
   pnpm: `pnpm prisma migrate dev`

4. Run the project using `yarn dev`, `npm run dev` or `pnpm dev` and the server will run on port: 3333.

## Routes
### POST /users
Create a user, sending `email` and `password` via body.

```json
{
    "email": "johndoe@example.com",
    "password": "1234"
}
```

### POST /users/login
User authentication, receive a JWT to use meals routes.

```json
{
    "email": "johndoe@example.com",
    "password": "1234"
}
```

### POST /meals
User can create a meal.


```json
{
    "name": "Meal",
    "description": "Meal description",
    "date": "2024-10-25T14:00:00Z",
    "is_on_diet": true
}
```

### GET /meals
List all meals

### GET /meals/:id
List a specific meal

### PUT /meals/:id
Update a meal entirely

```json
{
    "name": "Updated Meal",
    "description": "Updated Meal description",
    "date": "2024-10-25T16:00:00Z",
    "is_on_diet": false
}
```

### PATCH /meals/:id
Update a property (`name`, `description`, `date`, `is_on_diet`) from the meal

```json
{
    "name": "New Name here"
}
```

### DELETE /meals/:id
Delete a meal

### GET /meals/metrics
Get user metrics: totalMeals, totalMealsOnDiet, totalMealsOffDiet and bestSequenceOnDiet