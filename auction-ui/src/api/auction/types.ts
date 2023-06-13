import { OrderType } from 'src/types'

export enum PaymentType {
  Single = 'single',
  Multisig = 'multisig',
}

export interface Auction {
  id: number
  auction_meta: AuctionMeta
  auction_type: AuctionType
  bid_count: number
  current_bid: number
  title: string
  sub_title: string
  description: string
  starting_bid: number
  start_at: string
  end_at: string
  status: AuctionStatus
  proxy_increement: number
  slug: string
  is_featured: boolean
  is_dummy: boolean
  account: number
  category: number
  epoch?: MiningEpoch
  created_at: string
  updated_at: string
  deleted: boolean
  version: string
  payment_type: PaymentType
}

export interface MiningEpoch {
  start_time: string
  end_time: string
  start_block_height: number
  epoch_number: number
  difficulty: number
  block_reward: number
  total_hash_rate: number
  total_blocks_found: number
}

export enum AuctionStatus {
  Scheduled = 'scheduled',
  Active = 'active',
  Completed = 'completed',
}

export interface AsicModel {
  id: number
  name: string
  hashrate: number
}

export interface PowerSource {
  id: number
  name: string
}

export enum ProxyType {
  Mask = 'mask',
  Switch = 'switch',
}

export interface Proxy {
  name: string
  type: ProxyType
  order_type: OrderType
  stratums_id: number
  stratum: string
  algorithm: string
}

export interface AuctionMeta {
  id: number
  image_1: string
  image_2: string
  image_3: string
  site_photo: string
  live_feed_image: string
  hash_price_image: string
  power_source: PowerSource
  asic_model: AsicModel
  terms_link: string
  hashrate: number
  location: string
  current_hash_price: string
  days_of_mining: number
  hours_per_day: number
  proxy?: Proxy
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
  current_bid: BidsEntityOrCurrentBid | null
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

export interface PoolUser {
  pool: string
  username: string
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
  pool_user?: PoolUser
  phone_number?: string
  address?: string
  telegram_username?: string
  telegram_code: string
  created_at: string
  updated_at: string
  public_key?: string
  preferences: AccountPreferences
}

export interface AccountPreferences {
  email: boolean
  sms: boolean
  telegram: boolean
  event_bid_placed: boolean
  event_auction_start: boolean
  event_auction_end: boolean
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
