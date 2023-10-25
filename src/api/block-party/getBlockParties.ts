import { makeClientRequest } from 'src/api/clientRequest'

export async function getBlockParties({ token }: { token: string }): Promise<any> {
  const res = await makeClientRequest({
    method: 'GET',
    path: `/api/products/block-parties`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res
}
