'use client'

import { makeClientRequest } from 'src/api/clientRequest'
import { Auction } from 'src/types'
import { BidsEntityOrCurrentBid, Winner } from './types'

export interface AuctionResponse {
  auction: Auction
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
  proxy_bid: BidsEntityOrCurrentBid[]
  winner: Winner
}

export async function getAuctionBySlug(slug: string): Promise<AuctionResponse> {
  const auction: AuctionResponse = await makeClientRequest({ method: 'GET', path: `/api/auctions?slug=${slug}` })

  // TODO: Error handling

  return auction
}
