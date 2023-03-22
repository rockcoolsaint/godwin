import { makeServerRequest } from 'src/api/serverRequest'
import { Auction } from 'src/types'
import { BidsEntityOrCurrentBid, Winner } from './types'

interface AuctionResponse {
  auction: Auction
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
  proxy_bid: BidsEntityOrCurrentBid[]
  winner: Winner
}

export async function getAuctionBySlug(slug: string): Promise<AuctionResponse> {
  const auction: AuctionResponse = await makeServerRequest({ method: 'GET', path: `/api/auctions?slug=${slug}` })

  // TODO: Error handling

  return auction
}
