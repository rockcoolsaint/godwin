'use client'

import { makeClientRequest } from 'src/api/clientRequest'

export async function getOngoingDeliveries(token: string): Promise<any> {
  const hashrateDeliveries = await makeClientRequest({
    method: 'GET',
    path: '/api/account/deliveries/ongoing',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return hashrateDeliveries
}
