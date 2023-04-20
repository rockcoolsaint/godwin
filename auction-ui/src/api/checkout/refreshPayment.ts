import { makeClientRequest } from 'src/api/clientRequest'
import { Payment } from 'src/types'

export default async function refreshPayment(paymentId: number, token: string): Promise<Payment> {
  const payment = await makeClientRequest({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    path: '/api/payments/refresh',
    body: { payment_id: paymentId },
  })

  return payment
}
