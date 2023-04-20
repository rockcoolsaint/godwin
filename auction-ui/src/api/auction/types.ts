import { Bid } from 'src/types'

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
  start_at: string
  end_at: string
  status: AuctionStatus
  proxy_increement: number
  slug: string
  payment_address: string
  payment_address_qr: string
  account: number
  category: number
}

export enum AuctionStatus {
  Scheduled = 'scheduled',
  Active = 'active',
  Completed = 'completed',
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
  bids?: Bid[] | null
  current_bid: Bid
  proxy_bid?: null[] | null
  winner: Winner
}

export interface BidsEntityOrCurrentBid {
  id: number
  account: Account
  created_at: string
  updated_at: string
  deleted: boolean
  version: string
  bid: number
  auction_list: number
}

export interface Account {
  id: number
  username: string
  first_name?: string
  last_name?: string
  email: string
  is_staff: boolean
  is_verified: boolean
  is_paid: boolean
  is_onboarded: boolean
  is_subscribed: boolean
  avatar?: string
  referral_code?: string
  mining_pool_address?: string
  mining_pool_username?: string
  phone_number?: string
  address?: string
  telegram_username?: string
  created_at: string
  updated_at: string
}

export interface Winner {
  id: number
  account: Account
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
