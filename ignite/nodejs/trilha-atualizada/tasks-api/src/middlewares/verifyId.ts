import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

/*
    Check if id param is received
    Check if it is a valid uuid
    Check if there is a task with this id
*/

export async function verifyId(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const taskIdParam = z.object({
		id: z.string().uuid(),
	})

	const { data } = taskIdParam.safeParse(req.params)

	if (!data) {
		res.status(400).json({
			message: 'Invalid ID',
		})
		return
	}

	const { id } = data

	const task = await prisma.task.findUnique({
		where: {
			id,
		},
	})

	if (!task) {
		res.status(404).end()
		return
	}

	req.task = task
	next()
}
