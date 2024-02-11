# Expert Polls

A real-time voting system where users can create a poll and other users can cast their votes. The system generates a ranking among the options and updates the votes in real-time.

## Requisites

- Docker
- Node.js

## Tools

- Typescript
- Fastify
- zod
- Prisma
- Redis (using docker)
- PostgreSQL (using docker)

## Setup

- Clone the repository;
- Install dependencies (`npm install` or `yarn install`);
- Setup PostgreSQL and Redis (`docker compose up -d`);
- Copy `.env.example` file (`cp .env.example .env`);
- Run application (`npm dev` or `yarn dev`);
- Test it! (I personally recommend testing with [Postman](https://www.postman.com/downloads/)).

## HTTP

### POST `/polls`

Create a new poll.

#### Request body

```json
{
  "title": "Qual o melhor framework Node.JS?",
  "options": [
    "Express",
    "Fastify",
    "NestJS",
    "HapiJS"
  ]
}
```

#### Response body

```json
{
  "pollId": "e4365599-0205-4429-9808-ea1f94062a5f"
}
```

### GET `/polls/:pollId`

Return data from a single poll.

#### Response body

```json
{
	"poll": {
		"id": "e4365599-0205-4429-9808-ea1f94062a5f",
		"title": "Qual o melhor framework Node.JS?",
		"options": [
			{
				"id": "4af3fca1-91dc-4c2d-b6aa-897ad5042c84",
				"title": "Express",
				"score": 0
			},
			{
				"id": "780b8e25-a40e-4301-ab32-77ebf8c79da8",
				"title": "Fastify",
				"score": 1
			},
			{
				"id": "539fa272-152b-478f-9f53-8472cddb7491",
				"title": "NestJS",
				"score": 0
			},
			{
				"id": "ca1d4af3-347a-4d77-b08b-528b181fe80e",
				"title": "HapiJS",
				"score": 0
			}
		]
	}
}
```

### POST `/polls/:pollId/votes`

Add a vote to specific poll.

#### Request body

```json
{
  "pollOptionId": "780b8e25-a40e-4301-ab32-77ebf8c79da8"
}
```

## WebSockets

### ws `/polls/:pollId/results`

#### Message

```json
{
  "pollOptionId": "780b8e25-a40e-4301-ab32-77ebf8c79da8",
  "votes": 2
}
```