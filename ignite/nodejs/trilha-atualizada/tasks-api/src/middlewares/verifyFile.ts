import type { NextFunction, Request, Response } from 'express'
import multer, { MulterError } from 'multer'

const maxSizeInBytes = 10485760 // 10 Mb

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: maxSizeInBytes },
}).single('file')

/*
    Read file with max 10mb size
    Handle Errors
*/

export function verifyFile(req: Request, res: Response, next: NextFunction) {
	upload(req, res, (err) => {
		if (err instanceof MulterError) {
			res.status(400).json({
				message: `${err.message}: ${err.field}`,
			})
		} else if (err) {
			res.status(400).json({
				message: `${err.message}: ${err.field}`,
			})
		}

		if (req.file && req.file.mimetype !== 'text/csv') {
			res.status(400).json({
				message: 'Invalid file type. File must be a csv',
			})
		}

		next()
	})
}
