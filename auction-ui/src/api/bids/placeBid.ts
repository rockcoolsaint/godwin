import { makeClientRequest } from 'src/api/clientRequest'
import { PlaceBidRequest } from 'src/api/bids/types'

export async function placeBid(body: PlaceBidRequest) {
  const auction = await makeClientRequest({ method: 'POST', path: `/api/bids/place`, body })

  return auction
}
