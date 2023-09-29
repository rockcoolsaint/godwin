'use client'

import { makeClientRequest } from 'src/api/clientRequest'
import { AllAuctionsResponse } from 'src/api/auction/types'

interface Props {
  limit?: number
  offset?: number
  sorting?: 'desc' | 'asc'
  auction_type?: 'immediate_delivery' | 'forward_date' | 'upfront_payment'
  auction_status?: 'scheduled' | 'active' | 'completed'
  sort_by?: 'epoch' | 'created_at' | 'hashrate' | 'time_remaining' | 'highest_bid' | 'going_hashprice'
  group_by?: 'auction_status'
}

export async function getAllAuctions({
  limit = 21,
  offset = 0,
  sorting = 'desc',
  auction_type,
  auction_status,
  sort_by,
  group_by,
}: Props): Promise<AllAuctionsResponse> {
  const auctions: AllAuctionsResponse = await makeClientRequest({
    method: 'GET',
    path:
      `/api/auctions?limit=${limit}&offset=${offset}&sorting=${sorting}` +
      (auction_type ? `&auction_type=${auction_type}` : ``) +
      (auction_status ? `&auction_status=${auction_status}` : ``) +
      (sort_by ? `&sort_by=${sort_by}` : ``) +
      (group_by ? `&group_by=${group_by}` : ``),
  })

  return auctions
}
