import { Auction } from 'src/api/auction/types'

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

export enum OrderType {
  Auction = 'auction',
  Direct = 'direct',
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
  type: OrderType
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
