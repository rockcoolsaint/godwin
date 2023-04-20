import { BidsEntityOrCurrentBid } from 'src/api/auction/types'
import { makeClientRequest } from 'src/api/clientRequest'

interface Response {
  current_bid: number
  bids: BidsEntityOrCurrentBid[]
}

export async function getBidsByAuctionId(id: number): Promise<Response> {
  const auction: Response = await makeClientRequest({ method: 'GET', path: `/api/auctions?bids=${id}` })

  return auction
}
