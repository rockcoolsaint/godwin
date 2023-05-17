import { Order } from 'src/types'
import { makeClientRequest } from 'src/api/clientRequest'

export async function getOrderByAuctionId(auctionId: number, token: string): Promise<Order> {
  const order: Order = await makeClientRequest({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    path: `/api/orders?auction_id=${auctionId}`,
  })

  // TODO: Error handling

  return order
}
