import { makeClientRequest } from 'src/api/clientRequest'
import { Payment } from 'src/types'

export default async function createDirectOrderPayment(orderId: number, success_url: string): Promise<Payment> {
  const payment = await makeClientRequest({
    method: 'POST',
    path: '/api/payments/create',
    body: { order_id: orderId, success_url: success_url },
  })

  return payment
}
