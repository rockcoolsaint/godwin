'use client'

import { makeClientRequest } from 'src/api/clientRequest'
import { PlaceBidRequest } from 'src/api/bids/types'

export async function placeBid(body: PlaceBidRequest, token: string) {
  await makeClientRequest({
    method: 'POST',
    path: `/api/bids/place`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  })
}
