'use client'

import { makeClientRequest } from 'src/api/clientRequest'
import { Auction } from 'src/api/auction/types'

export async function getFeaturedAuctions(): Promise<Auction[]> {
  const featuredAuction: Auction[] = await makeClientRequest({
    method: 'GET',
    path: `/api/auctions/featured`,
  })

  return featuredAuction
}
