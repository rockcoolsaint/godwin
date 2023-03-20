import { makeClientRequest } from 'src/api/clientRequest'

let loading = false

export default async function createPayment(orderId: number) {
  if (!loading) {
    loading = true
    const payment = makeClientRequest({ method: 'POST', path: '/api/payments/create', body: { order_id: orderId } })

    loading = false

    return payment
  }

  return undefined
}
