# Finance Control API

This is the second project in the updated course of Node.js from Rocketseat.<br>
In this project a API was created using fastify and cookies were used to store sessionId of the corresponding user, to identify him in the application and only show transactions created by him. 

The User should be able to:<br>
☑️  Create a transaction<br>
☑️  List all transactions<br>
☑️  List a specific transaction<br>
☑️  Check the summary of account<br>

## Tools
- Typescript
- fastify
- zod
- vitest
- supertest
- knex

## Quick Start
1. Install the dependencies<br>
   npm: `npm install`<br>
   yarn: `yarn install`<br>
   pnpm: `pnpm install`

2. Create a `.env` and `.env.test` file in the root folder:<br>

<b>.env</b>:
```env
DATABASE_URL="file:./dev.db"
DATABASE_CLIENT="sqlite3"
NODE_ENV="development"
```

<b>.env.test</b>:
```env
DATABASE_CLIENT="sqlite3"
DATABASE_URL="./db/test.db"
```

3. Run database migrations:<br>
   npm: `npm run knex migrate:latest`<br>
   yarn: `yarn knex migrate:latest`<br>
   pnpm: `pnpm knex migrate:latest`

4. Run the project using `yarn dev`, `npm run dev` or `pnpm dev` and the server will run (default port: 3333).

## Routes
### GET /transactions
User can list all transactions created by him

### GET /transactions/:id
User can list a specific transaction created by him

### POST /transactions
User can create a transaction sending a body with `title`, `amount` and `type`.<br>
The type should be 'credit' or 'debit'

```json
{
    "title": "New Transaction",
    "amount": 4000,
    "type": "credit"
}
```