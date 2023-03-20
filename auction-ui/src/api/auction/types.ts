export interface Auction {
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
  slug: string
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
  auction: Auction[]
}

export interface AuctionOfTheDayResponse {
  auction: Auction
  bids?: BidsEntityOrCurrentBid[] | null
  current_bid: BidsEntityOrCurrentBid
  proxy_bid?: null[] | null
  winner: Winner
}

export interface BidsEntityOrCurrentBid {
  id: number
  user: User
  created_at: string
  updated_at: string
  deleted: boolean
  version: string
  bid: number
  auction_list: number
}
export interface User {
  id: number
  first_name: string
  uploaded_profile: string
  date_joined: string
  bidding_name: string
  email: string
  username: string
  last_name: string
  is_paid: boolean
  is_coupon_used: boolean
  coupon?: null
  profile_pik: string
  phone_number?: null
  address: string
  newsletter_subscribe: boolean
  telegram_username?: null
  mining_pool_stratum_address: string
  mining_pool_username?: null
  refer_code: string
  referral_code?: null
}
export interface Winner {
  id: number
  user: User
  created_at: string
  updated_at: string
  deleted: boolean
  version: string
  position: number
  bid_price: number
  is_winner: boolean
  auction: number
}

export interface AllAuctionsResponse {
  count: number
  next: number | null
  previous: number | null
  results: Auction[]
}
