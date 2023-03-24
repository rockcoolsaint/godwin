import { makeServerRequest } from 'src/api/serverRequest'
import { AuctionOfTheDayResponse } from 'src/api/auction/types'

export async function getAuctionOfTheDay(): Promise<AuctionOfTheDayResponse> {
  const auctionOfTheDay: AuctionOfTheDayResponse = await makeServerRequest({
    method: 'GET',
    path: `/api/auctions/featured-today`,
  })

  return auctionOfTheDay
}
