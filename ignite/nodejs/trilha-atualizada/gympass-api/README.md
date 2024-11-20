# Gympass API

This is the third project in the updated course of Node.js from Rocketseat.<br>
In this project a API was created using fastify and JWT token were used to identify the corresponding user.<br>
The purpose of this application is to allow members to do check-ins at gyms and several concepts were used, such as SOLID, Factory Method, TDD, JWT, Refresh Token and RBAC.<br>
Only `ADMIN` can create gyms and validate check-ins; Users with `MEMBER` role are allowed to create a check-in and use all the routes except the check-in validation and gym creation.<br>
Users are allowed to create only one check-in per day.<br>

The API can:<br>
☑️  Create a user<br>
☑️  User Login (Authentication)<br>
☑️  Get User Profile<br>
☑️  Get JWT Token using Refresh Token<br>
☑️  Create Gyms (only `ADMIN`)<br>
☑️  Search Gyms by name<br>
☑️  Search Nearby Gyms (10km)<br>
☑️  Create Check-in (only for gyms in 100m range)<br>
☑️  Validate Check-in (only `ADMIN`)<br>
☑️  Get Check-in History<br>
☑️  Get Check-in Metrics (number of check-ins)<br>


## Tools
- Typescript
- fastify
- zod
- vitest
- supertest
- Prisma
- bcryptjs
- date-fns

## Quick Start
1. Install the dependencies<br>
   npm: `npm install`<br>
   yarn: `yarn install`<br>
   pnpm: `pnpm install`

2. Create a `.env` file in the root folder:<br>

<b>.env</b>:
```env
NODE_ENV=dev

# Auth
JWT_SECRET="secretHere"

# Database
DATABASE_URL="postgresql://docker:docker@localhost:5432/gympass?schema=public"
```

3. Run the docker container to start the database
```sh
docker compose up -d
```

4. Run database migrations:<br>
   npm: `npx prisma migrate dev`<br>
   yarn: `yarn prisma migrate dev`<br>
   pnpm: `pnpm prisma migrate dev`

5. Run the project using `yarn start:dev`, `npm run start:dev` or `pnpm start:dev` and the server will run on port: 3333.

## Routes
### POST /users
Create a user, sending `name` `email` and `password` via body.

```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "12345678"
}
```

### POST /sessions
User authentication, sending `email` and `password` via body to receive a JWT to use in authenticated routes.

```json
{
    "email": "johndoe@example.com",
    "password": "12345678"
}
```

### POST /me
Get User Profile

### POST /token/refresh
Get new JWT Access Token using Refresh Token via cookies

### GET /gyms/search
Search Gyms by name using query params `q` and `page` (optional) to paginate.

### GET /gyms/nearby
List Nearby Gyms sending user `latitude` and user `longitude` via query params.

### POST /gyms
Create a gym, sending  `title`, `description` (optional), `phone` (optional), `latitude` and `longitude` via body.<br>
Only `ADMIN` can create gyms.

```json
{
    "title": "Gym 01",
    "description": "Description 01",
    "phone": "1199999999",
    "latitude": -23.5489,
    "longitude": -46.6388
}
```

### POST /gyms/:gymId/check-ins
Create a check-in sending `gymId` via param and user `latitude` and user `longitude` in body.

```json
{
    "latitude": -23.5489,
    "longitude": -46.6388
}
```

### GET /check-ins/history
List history of check-ins

### GET /check-ins/metrics
Get the total count of of check-ins

### PATCH /check-ins/:checkInId/validate
Validate a check-in sending `checkInId` via param.<br>
Only `ADMIN` can validate check-ins.