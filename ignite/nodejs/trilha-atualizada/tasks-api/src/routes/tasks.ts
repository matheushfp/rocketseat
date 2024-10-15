import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export const tasksRouter = Router()

tasksRouter.get('/', async (_req, res) => {
	const tasks = await prisma.task.findMany()

	res.json(tasks)
})

tasksRouter.post('/', async (req, res) => {
	const createTaskBody = z.object({
		title: z.string(),
		description: z.string(),
	})

	const { data } = createTaskBody.safeParse(req.body)

	if (!data) {
		res.status(400).end()
	} else {
		// Valid Task Body
		const { title, description } = data

		const task = await prisma.task.create({
			data: {
				title,
				description,
			},
		})

		res.status(201).send()
	}
})
