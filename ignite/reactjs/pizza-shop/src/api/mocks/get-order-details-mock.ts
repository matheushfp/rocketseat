import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '999999999',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
    totalInCents: 13000,
    orderItems: [
      {
        id: 'order-item-1',
        product: { name: 'Product-1' },
        priceInCents: 4200,
        quantity: 1,
      },
      {
        id: 'order-item-2',
        product: { name: 'Product-2' },
        priceInCents: 4400,
        quantity: 2,
      },
    ],
  })
})
