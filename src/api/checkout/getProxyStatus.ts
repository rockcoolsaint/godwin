import { makeClientRequest } from 'src/api/clientRequest'
import { ProxyStatusResponse } from 'src/types'

export default async function getProxyStatus(orderId: string | number): Promise<ProxyStatusResponse> {
  const proxyStatus = await makeClientRequest({
    method: 'GET',

    path: `/api/orders/${orderId}/proxy`,
  })

  return proxyStatus
}
