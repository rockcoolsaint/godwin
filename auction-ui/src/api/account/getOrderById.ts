import { makeClientRequest } from 'src/api/clientRequest'

export async function getOrderById(token: string, id?: string): Promise<any> {
  const orders = await makeClientRequest({
    method: 'GET',
    path: `/api/account/orders/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return orders
}
