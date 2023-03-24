import { makeServerRequest } from 'src/api/serverRequest'
import { AllAuctionsResponse } from 'src/api/auction/types'

interface Props {
  limit?: number
  offset?: number
  sorting?: 'desc' | 'asc'
}

export async function getAllAuctions({ limit, offset = 0, sorting = 'desc' }: Props): Promise<AllAuctionsResponse> {
  const auctions: AllAuctionsResponse = await makeServerRequest({
    method: 'GET',
    path: `/api/auctions?limit=${limit}&offset=${offset}&sorting=${sorting}`,
  })

  return auctions
}
