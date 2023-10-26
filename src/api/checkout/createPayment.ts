import { makeClientRequest } from 'src/api/clientRequest'
import { Payment } from 'src/types'

export default async function createPayment(orderId: number, token: string): Promise<Payment> {
  const payment = await makeClientRequest({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    path: '/api/payments/create',
    body: { order_id: orderId },
  })

  return payment
}
