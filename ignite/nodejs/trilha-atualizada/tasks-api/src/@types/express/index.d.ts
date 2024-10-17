declare namespace Express {
	export interface Request {
		task: {
			id: string
			title: string
			description: string
			created_at: Date
			updated_at: Date
			completed_at: Date | null
		}
	}
}
