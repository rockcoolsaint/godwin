import { makeServerRequest } from 'src/api/serverRequest'
import { Products } from 'src/api/auction/types'

export async function getFeaturedAuctions(): Promise<Products[]> {
  const featuredAuction: Products[] = await makeServerRequest({
    method: 'GET',
    path: `/api/auctions/featured`,
  })

  console.log('getFeaturedAuctions ', featuredAuction)

  return featuredAuction
}
