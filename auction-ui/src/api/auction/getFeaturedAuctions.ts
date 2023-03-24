import { makeServerRequest } from 'src/api/serverRequest'
import { Auction } from 'src/api/auction/types'

export async function getFeaturedAuctions(): Promise<Auction[]> {
  const featuredAuction: Auction[] = await makeServerRequest({
    method: 'GET',
    path: `/api/auctions/featured`,
  })

  return featuredAuction
}
