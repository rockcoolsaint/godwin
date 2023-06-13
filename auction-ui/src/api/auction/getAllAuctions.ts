'use client'

import { makeClientRequest } from 'src/api/clientRequest'
import { AllAuctionsResponse } from 'src/api/auction/types'

interface Props {
  limit?: number
  offset?: number
  sorting?: 'desc' | 'asc'
}

export async function getAllAuctions({ limit, offset = 0, sorting = 'desc' }: Props): Promise<AllAuctionsResponse> {
  const auctions: AllAuctionsResponse = await makeClientRequest({
    method: 'GET',
    path: `/api/auctions?limit=${limit}&offset=${offset}&sorting=${sorting}&demo=true`,
  })

  return auctions
}
