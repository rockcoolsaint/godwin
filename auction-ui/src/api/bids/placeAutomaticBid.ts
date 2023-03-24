import { makeClientRequest } from 'src/api/clientRequest'
import { PlaceAutomaticBidRequest } from 'src/api/bids/types'

export async function placeAutomaticBid(body: PlaceAutomaticBidRequest) {
  const auction = await makeClientRequest({ method: 'POST', path: `/api/bids/place-automatic`, body })

  return auction
}
