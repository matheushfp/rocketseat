import { parse } from 'csv-parse'
import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { verifyFile } from '../middlewares/verifyFile'
import { verifyId } from '../middlewares/verifyId'

export const tasksRouter = Router()

tasksRouter.get('/', async (req, res) => {
	const queryParamFilters = z.object({
		title: z.string().optional(),
		description: z.string().optional(),
	})

	const { title, description } = queryParamFilters.parse(req.query)

	const tasks = await prisma.task.findMany({
		where: {
			title: {
				contains: title,
			},
			description: {
				contains: description,
			},
		},
	})

	res.json(tasks)
})

tasksRouter.post('/', verifyFile, async (req, res) => {
	// handle multipart/form-data requests
	if (req.headers['content-type']?.includes('multipart/form-data')) {
		if (req.file && req.file.mimetype === 'text/csv') {
			const data = await parse(req.file.buffer, { from_line: 2 }).toArray()

			await Promise.all(
				data.map(async (row) => {
					const [title, description] = row

					await prisma.task.create({
						data: {
							title,
							description,
						},
					})
				}),
			)

			res.status(201).end()
			return
		}
	}

	// handle requests without file
	const createTaskBody = z.object({
		title: z.string(),
		description: z.string(),
	})

	const { data } = createTaskBody.safeParse(req.body)

	if (!data) {
		res.status(400).end()
		return
	}

	const { title, description } = data

	const task = await prisma.task.create({
		data: {
			title,
			description,
		},
	})

	res.status(201).json(task)
})

tasksRouter.put('/:id', verifyId, async (req, res) => {
	const updateTaskBody = z.object({
		title: z.string().optional(),
		description: z.string().optional(),
	})

	const { title, description } = updateTaskBody.parse(req.body)

	if ((!title && !description) || (title === '' && description === '')) {
		res.status(400).end()
		return
	}

	const { id } = req.task

	await prisma.task.update({
		where: {
			id,
		},
		data: {
			title: title ? title : req.task.title,
			description: description ? description : req.task.description,
			updated_at: new Date(),
		},
	})

	res.status(204).end()
})

tasksRouter.patch('/:id/complete', verifyId, async (req, res) => {
	const { id, completed_at: completedAt } = req.task

	await prisma.task.update({
		where: {
			id,
		},
		data: {
			updated_at: new Date(),
			completed_at: completedAt === null ? new Date() : null,
		},
	})

	res.status(204).end()
})

tasksRouter.delete('/:id', verifyId, async (req, res) => {
	const { id } = req.task

	await prisma.task.delete({
		where: {
			id,
		},
	})

	res.status(204).end()
})
