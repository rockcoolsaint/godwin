import { makeClientRequest } from 'src/api/clientRequest'
import { BlockPartyResponse } from 'src/types'

export async function getBlockParty({ id }: { id: number }): Promise<BlockPartyResponse> {
  const res: BlockPartyResponse = await makeClientRequest({
    method: 'GET',
    path: `/api/products/block-parties/${id}`,
  })

  return res
}
