import { makeClientRequest } from 'src/api/clientRequest'

let loading = false

export default async function refreshPayment(paymentId: number) {
  if (!loading) {
    loading = true
    const payment = await makeClientRequest({ method: 'POST', path: '/api/payments/refresh', body: { payment_id: paymentId } })

    loading = false

    return payment
  }

  return undefined
}
