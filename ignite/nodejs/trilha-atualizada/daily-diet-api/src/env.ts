import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({path: '.env.test'})
} else {
  config()
}

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'test']).default('development'),
})

const result = envSchema.safeParse(process.env)

if(!result.success) {
  console.error('Invalid environment variables:', result.error.format())
  throw new Error('Invalid environment variables')
}

export const env = result.data
