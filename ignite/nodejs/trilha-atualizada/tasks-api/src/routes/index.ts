import { Router } from 'express'
import { tasksRouter } from './tasks'

export const router = Router()

router.use('/tasks', tasksRouter)
