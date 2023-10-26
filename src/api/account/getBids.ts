'use client'

import { makeClientRequest } from 'src/api/clientRequest'

export async function getBids(token: string): Promise<any> {
  const orders = await makeClientRequest({
    method: 'GET',
    path: '/api/account/active-bids',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return orders
}
