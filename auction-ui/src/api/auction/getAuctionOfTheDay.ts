import { AuctionOfTheDayResponse } from 'src/api/auction/types'
import { makeServerRequest } from 'src/api/serverRequest'

export async function getAuctionOfTheDay({ isDemo }: { isDemo?: boolean }): Promise<AuctionOfTheDayResponse> {
  const auctionOfTheDay: AuctionOfTheDayResponse = await makeServerRequest({
    method: 'GET',
    path: `/api/auctions/featured-today${isDemo ? '?demo=true' : ''}`,
    nextFetchRequestConfig: {
      revalidate: 0,
    },
  })

  return auctionOfTheDay
}
