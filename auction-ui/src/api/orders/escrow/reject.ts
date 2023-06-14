import { Order } from 'src/types'
import { makeClientRequest } from 'src/api/clientRequest'

export async function reject(orderId: number, reason: string, token: string): Promise<any> {
  const order: Order = await makeClientRequest({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    path: `/api/orders/escrow/reject`,
    body: {
      order_id: orderId,
      reason: reason,
    },
  })

  // TODO: Error handling

  return order
}
