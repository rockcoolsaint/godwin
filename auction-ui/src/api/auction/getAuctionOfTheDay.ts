'use client'

import { makeClientRequest } from 'src/api/clientRequest'
import { AuctionOfTheDayResponse } from 'src/api/auction/types'

export async function getAuctionOfTheDay(): Promise<AuctionOfTheDayResponse> {
  const auctionOfTheDay: AuctionOfTheDayResponse = await makeClientRequest({
    method: 'GET',
    path: `/api/auctions/featured-today`,
  })

  return auctionOfTheDay
}
