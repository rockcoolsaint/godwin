import { makeServerRequest } from 'src/api/serverRequest'
import { Auction } from 'src/types'

export async function getLatestRollingAuction(): Promise<Auction> {
  const auction = await makeServerRequest({
    method: 'GET',
    path: `/api/auctions/latest-rolling`,
  })

  return auction
}
