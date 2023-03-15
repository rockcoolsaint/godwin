export interface Products {
  id: number
  auction_meta: AuctionMeta
  auction_type: AuctionType
  bid_count: number
  current_bid: number
  created_at: string
  updated_at: string
  deleted: boolean
  version: string
  title: string
  sub_title: string
  description: string
  starting_bid: number
  auction_start_date: string
  expiry_at: string
  is_expired: boolean
  proxy_increement: number
  is_auction_active: boolean
  auction_status: string
  slug_category: string
  payment_address: string
  payment_address_qr: string
  user: number
  category: number
}

export interface AuctionMeta {
  id: number
  profile_image_1: string
  profile_image_2: string
  profile_image_3: string
  site_photo: string
  live_feed_image: string
  hash_price_image: string
  power_source: string
  asic_model: string
  terms_link: string
  hashrate: string
  location: string
  current_hash_price: string
  days_of_mining: string
  hours_per_day: string
}
export interface AuctionType {
  id: number
  type: string
  percentage: number
}

export interface HomePageDataResponse {
  products: Products[]
  id: number
  show_collection: number
}
