'use client'

import { makeClientRequest } from 'src/api/clientRequest'
import { Auction, BidsEntityOrCurrentBid as Bid, ProxyBid } from 'src/api/auction/types'

import { Winner } from './types'

export interface AuctionResponse {
  auction: Auction
  bids: Bid[]
  current_bid: Bid
  proxy_bid: ProxyBid[]
  winner: Winner
}

export async function getAuctionBySlug(slug: string): Promise<AuctionResponse> {
  const auction: AuctionResponse = await makeClientRequest({ method: 'GET', path: `/api/auctions/${slug}` })

  // TODO: Error handling

  return auction
}
