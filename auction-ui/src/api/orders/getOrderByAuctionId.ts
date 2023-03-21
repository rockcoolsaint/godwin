import { makeServerRequest } from 'src/api/serverRequest'
import { Order } from 'src/types'

export async function getOrderByAuctionId(auctionId: number): Promise<Order> {
  const order: Order = await makeServerRequest({ method: 'GET', path: `/api/orders?auction_id=${auctionId}` })

  // TODO: Error handling

  return order
}
