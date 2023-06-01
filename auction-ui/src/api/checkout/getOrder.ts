import { makeClientRequest } from 'src/api/clientRequest'
import { Order } from 'src/types'

export default async function getOrder(orderId: string | number, token: string): Promise<Order> {
  const order = await makeClientRequest({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    path: `/api/orders?order_id=${orderId}`,
  })

  return order
}
