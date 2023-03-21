import { makeClientRequest } from 'src/api/clientRequest'
import { Payment } from 'src/types'

let loading = false

export default function refreshPayment(paymentId: number): Promise<Payment> {
  return new Promise((resolve, reject) => {
    if (!loading) {
      loading = true
      makeClientRequest({ method: 'POST', path: '/api/payments/refresh', body: { payment_id: paymentId } })
        .then(payment => resolve(payment))
        .catch(reject)
        .finally(() => {
          loading = false
        })
    }
  })
}
