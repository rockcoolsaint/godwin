export interface PlaceBidRequest {
  bid_amnt: number
  list_id: number
}

export interface PlaceAutomaticBidRequest {
  max_proxy_amount: number
  auction_id: number
}
