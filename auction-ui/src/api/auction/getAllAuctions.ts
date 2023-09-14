'use client'

import { makeClientRequest } from 'src/api/clientRequest'
import { AllAuctionsResponse } from 'src/api/auction/types'

interface Props {
  limit?: number
  offset?: number
  sorting?: 'desc' | 'asc'
  auction_type?: string
  auction_status?: string
}

export async function getAllAuctions({
  limit = 21,
  offset = 0,
  sorting = 'desc',
  auction_type,
  auction_status,
}: Props): Promise<AllAuctionsResponse> {
  const auctions: AllAuctionsResponse = await makeClientRequest({
    method: 'GET',
    path:
      `/api/auctions?limit=${limit}&offset=${offset}&sorting=${sorting}` +
      (auction_type ? `&auction_type=${auction_type}` : ``) +
      (auction_status ? `&auction_status=${auction_status}` : ``),
  })

  return auctions
}
