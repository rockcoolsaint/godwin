import { makeClientRequest } from 'src/api/clientRequest'
import { Payment } from 'src/types'

let loading = false

export default function createPayment(orderId: number): Promise<Payment> {
  return new Promise((resolve, reject) => {
    if (!loading) {
      loading = true
      makeClientRequest({ method: 'POST', path: '/api/payments/create', body: { order_id: orderId } })
        .then(payment => resolve(payment))
        .catch(reject)
        .finally(() => {
          loading = false
        })
    }
  })
}
