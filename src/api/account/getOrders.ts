'use client'

import { makeClientRequest } from 'src/api/clientRequest'

export async function getOrders(token: string): Promise<any> {
  const orders = await makeClientRequest({
    method: 'GET',
    path: '/api/account/orders',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return orders
}
