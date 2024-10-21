import { knex as knexInstance, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'slite3'
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    directory: './db/migrations',
  },
}

export const knex = knexInstance(config)
