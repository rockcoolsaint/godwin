import { Order } from 'src/types'
import { makeClientRequest } from 'src/api/clientRequest'

export async function refund(orderId: number, reason: string, token: string): Promise<any> {
  const order: Order = await makeClientRequest({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    path: `/api/orders/escrow/refund`,
    body: {
      order_id: orderId,
      reason: reason,
    },
  })

  // TODO: Error handling

  return order
}
