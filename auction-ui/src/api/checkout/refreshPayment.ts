import { makeClientRequest } from 'src/api/clientRequest'
import { Payment } from 'src/types'

export default async function refreshPayment(paymentId: number): Promise<Payment> {
  const payment = await makeClientRequest({ method: 'POST', path: '/api/payments/refresh', body: { payment_id: paymentId } })

  return payment
}
