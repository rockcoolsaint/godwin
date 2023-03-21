import { makeClientRequest } from 'src/api/clientRequest'
import { Order } from 'src/types'

let loading = false

export default function getOrder(orderId: string): Promise<Order> {
  return new Promise((resolve, reject) => {
    if (!loading) {
      loading = true
      makeClientRequest({ method: 'GET', path: `/api/orders?order_id=${orderId}` })
        .then(order => resolve(order))
        .catch(reject)
        .finally(() => {
          loading = false
        })
    }
  })
}
