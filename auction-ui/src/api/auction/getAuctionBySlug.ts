import { makeServerRequest } from 'src/api/serverRequest'
import { Auction } from 'src/types'

interface AuctionResponse {
  auction: Auction
}

export async function getAuctionBySlug(slug: string): Promise<AuctionResponse> {
  const auction: AuctionResponse = await makeServerRequest({ method: 'GET', path: `/api/auctions?slug=${slug}` })

  // TODO: Error handling

  return auction
}
