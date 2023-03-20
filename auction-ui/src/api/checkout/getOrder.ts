import { makeClientRequest } from 'src/api/clientRequest'

let loading = false

export default async function getOrder(orderId: string) {
  if (!loading) {
    loading = true

    const order = await makeClientRequest({ method: 'GET', path: `/api/orders?order_id=${orderId}` })

    loading = false

    return order
  }

  return undefined
}
