'use client'

import { makeClientRequest } from 'src/api/clientRequest'

export async function getHashrateDeliveries(token: string): Promise<any> {
  const hashrateDeliveries = await makeClientRequest({
    method: 'GET',
    path: '/api/account/hashrate-deliveries',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return hashrateDeliveries
}
