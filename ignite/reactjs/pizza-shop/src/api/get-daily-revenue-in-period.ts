import { api } from '@/lib/axios'

export interface GetDailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

export type GetDailyRevenueInPeriod = {
  receipt: number
  date: string
}[]

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const response = await api.get<GetDailyRevenueInPeriod>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
