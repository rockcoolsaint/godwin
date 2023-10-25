import { makeClientRequest } from 'src/api/clientRequest'

export async function getRates(token: string): Promise<any> {
  const res = await makeClientRequest({
    method: 'GET',
    path: `/api/products/rates`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res
}
