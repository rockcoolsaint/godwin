import { makeClientRequest } from 'src/api/clientRequest'

export default async function getOrderStatus(orderId: string | number): Promise<any> {
  const order = await makeClientRequest({
    method: 'GET',

    path: `/api/orders/${orderId}/proxy`,
  })

  return order
}
