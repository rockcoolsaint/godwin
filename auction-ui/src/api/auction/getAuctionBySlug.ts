'use client'

import { makeClientRequest } from 'src/api/clientRequest'
import { Auction, BidsEntityOrCurrentBid as Bid } from 'src/api/auction/types'

import { Winner } from './types'

export interface StratumsHashrate {
  average: number
  reported: number
  calculated: number
  normalized: number
  median: number
}

export interface Hashrate {
  hashrate: StratumsHashrate
  timestamp: string
}
export interface AuctionResponse {
  auction: Auction
  hashrate: Hashrate[]
  bids: Bid[]
  current_bid: Bid
  proxy_bids: Bid[]
  winner: Winner
}

export async function getAuctionBySlug(slug: string): Promise<AuctionResponse> {
  const auction: AuctionResponse = await makeClientRequest({ method: 'GET', path: `/api/auctions?slug=${slug}` })

  // TODO: Error handling

  return auction
}
