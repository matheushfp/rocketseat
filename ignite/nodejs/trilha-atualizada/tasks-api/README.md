# Tasks API

This is the first challenge in the updated course of Node.js from Rocketseat.<br>

The API should be able to:<br>
☑️  Create a task<br>
☑️  List all tasks<br>
☑️  Update a task by id<br>
☑️  Remove a task by id<br>
☑️  Mark a task as complete by id<br>
☑️  Bulk import tasks from a CSV file<br>

## Tools
- Typescript
- Express
- zod
- multer
- csv-parse
- Prisma

## Quick Start
1. Install the dependencies<br>
   npm: `npm install`<br>
   yarn: `yarn install`<br>
   pnpm: `pnpm install`

2. Create a `.env` file in the root folder containing the DATABASE_URL <br>

```env
DATABASE_URL="file:./dev.db"
```

3. Run Prisma migrations:<br>
   npm: `npx prisma migrate dev`<br>
   yarn: `yarn prisma migrate dev`<br>
   pnpm: `pnpm prisma migrate dev`

4. Run the project using `yarn dev`, `npm run dev` or `pnpm dev` and the server will run at port 3333.

## Routes
### GET /tasks
User can list all tasks or filter tasks using query params `title` and/or `description`

### POST /tasks
User can create a single task sending a body with `title` and `description`<br>

User can create multiple tasks by importing an csv file with maximum 10Mb.<br>
For this approach to work, the request must be a <b>multipart/form-data</b> and must have <b>only one file</b> with fieldname <b>file</b>.<br>
The file should be like this:
```csv
title,description
Task1,Description1
Task2,Description2
Task3,Description3
Task4,Description4
```

### PUT  /tasks/:id
User can update `title` and/or `description` of a desired task

### DELETE /tasks/:id
User can delete a desired task

### PATCH /tasks/:id/complete
User can mark a task as complete or not. If the task is completed, return to its "normal" state.