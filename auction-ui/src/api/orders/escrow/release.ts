import { Order } from 'src/types'
import { makeClientRequest } from 'src/api/clientRequest'

export async function release(orderId: number, token: string): Promise<any> {
  const order: Order = await makeClientRequest({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    path: `/api/orders/escrow/release`,
    body: {
      order_id: orderId,
    },
  })

  // TODO: Error handling

  return order
}
