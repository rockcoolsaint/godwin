import { makeClientRequest } from 'src/api/clientRequest'
import { BlockPartyResponse } from 'src/types'

export async function getBlockParty({ id, token }: { id: number; token: string }): Promise<BlockPartyResponse> {
  const res: BlockPartyResponse = await makeClientRequest({
    method: 'GET',
    path: `/api/products/block-parties/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res
}
