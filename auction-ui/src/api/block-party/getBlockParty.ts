import { makeClientRequest } from 'src/api/clientRequest'

export async function getBlockParty(id: string, token: string): Promise<any> {
  const res = await makeClientRequest({
    method: 'GET',
    path: `/api/products/block-parties/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res
}
