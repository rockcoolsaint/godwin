import { Order } from 'src/types'
import { makeClientRequest } from 'src/api/clientRequest'

export async function getOrder(orderId: number, token: string): Promise<Order> {
  const order: Order = await makeClientRequest({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    path: `/api/orders?order_id=${orderId}`,
  })

  // TODO: Error handling

  return order
}
