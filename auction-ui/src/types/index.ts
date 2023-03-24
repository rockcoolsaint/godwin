import { AuctionStatus } from 'src/api/auction/types'

export enum PaymentStatus {
  Processing = 'processing',
  Underpaid = 'underpaid',
  Paid = 'paid',
}

export interface PromoCode {
  code: string
  discount: number
}

export interface Payment {
  id: number
  order_id: string
  payment_id: string
  amount: number
  original_amount: number
  status: PaymentStatus
  checkout_url: string
  is_first: boolean
  has_initiated_payment: boolean
  missing_amount?: number
}

export enum OrderStatus {
  Unpaid = 'unpaid',
  Processing = 'processing',
  PaymentOneComplete = 'paid_1',
  PaymentTwoComplete = 'paid_2',
}

export interface Order {
  id: number
  auction: Auction
  price: number
  total: number
  mining_deposit: number
  auction_fee: number
  status: OrderStatus
  payments: Payment[]
  can_apply_promo_code: boolean
  promo_code?: PromoCode
}

export interface Collection {
  name: string
}

export enum AuctionTypeChoice {
  ImmediateDelivery = 'immediate_delivery',
  ForwardDate = 'forward_date',
  UpfrontPayment = 'upfront_payment',
}

export interface AuctionType {
  type: AuctionTypeChoice
  percentage: number
}

export interface AuctionMeta {
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

export interface Auction {
  id: number
  user: number
  title: string
  sub_title: string
  description: string
  starting_bid: number
  start_at: Date
  end_at: Date
  status: AuctionStatus
  category: Collection
  proxy_increment: number
  slug_category: string
  auction_type: AuctionType
  payment_address: string
  payment_address_qr: string
  auction_meta: AuctionMeta
}

export interface Account {
  id: number
  email: string
  bidding_name: string
  username: string
  first_name: string
  last_name: string
  is_paid: boolean
  avatar?: string
  phone_number?: string
  address?: string
  newsletter_subscribe: boolean
  telegram_username?: string
  mining_pool_stratum_address?: string
  mining_pool_username?: string
  referral_code: string
  onboarding_complete: boolean
}
