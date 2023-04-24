import { Order } from 'src/types'
import { makeClientRequest } from 'src/api/clientRequest'

export async function getOrderByAuctionId(auctionId: number): Promise<Order> {
  const order: Order = await makeClientRequest({ method: 'GET', path: `/api/orders?auction_id=${auctionId}` })

  // TODO: Error handling

  return order
}
