import { Auction } from 'src/api/auction/types'
import { makeServerRequest } from 'src/api/serverRequest'

export async function getFeaturedAuctions(): Promise<Auction[]> {
  const featuredAuction: Auction[] = await makeServerRequest({
    method: 'GET',
    path: `/api/auctions/featured?limit=6`,
    nextFetchRequestConfig: {
      revalidate: 0,
    },
  })

  return featuredAuction
}
