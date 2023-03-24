'use client'

import { AuctionOfTheDayResponse } from 'src/api/auction/types'
import { makeClientRequest } from 'src/api/clientRequest'

export async function getAuctionOfTheDay(): Promise<AuctionOfTheDayResponse> {
  const auctionOfTheDay: AuctionOfTheDayResponse = await makeClientRequest({
    method: 'GET',
    path: `/api/auctions/featured-today`,
  })

  console.log('ay')

  return auctionOfTheDay
}
