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
  account_id: number
  checkout_url?: string
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
  image_1: string
  image_2: string
  image_3: string
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
  account: number
  title: string
  sub_title: string
  description: string
  starting_bid: number
  start_at: string
  end_at: string
  status: AuctionStatus
  category: Collection
  proxy_increment: number
  slug: string
  auction_type: AuctionType
  payment_address: string
  payment_address_qr: string
  auction_meta: AuctionMeta
  current_bid?: number
}
