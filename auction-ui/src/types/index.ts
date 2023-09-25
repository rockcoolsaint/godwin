import { Account, Auction, PaymentProvider } from 'src/api/auction/types'

export enum PaymentStatus {
  Processing = 'processing',
  Underpaid = 'underpaid',
  Paid = 'paid',
  Unpaid = 'unpaid',
  Expired = 'expired',
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
  provider: PaymentProvider
  created_at: number
}

export enum OrderStatus {
  Unpaid = 'unpaid',
  Processing = 'processing',
  PaymentOneComplete = 'paid_1',
  PaymentTwoComplete = 'paid_2',
  DeliveryStarted = 'delivery_started',
  DeliveryEnded = 'delivery_ended',
  EscrowRequestRefund = 'escrow_request_refund',
  EscrowRequestCancel = 'escrow_request_cancel',
  EscrowRequestRelease = 'escrow_request_release',
  EscrowRefunded = 'escrow_refunded',
  EscrowCancelled = 'escrow_cancelled',
  EscrowReleased = 'escrow_released',
  EscrowReview = 'escrow_review',
  Paid = 'paid',
}

export enum OrderType {
  Auction = 'auction',
  Direct = 'direct',
}

export interface OrderMessage {
  order: Order
  account: Account
  content: string
  sender: 'system' | 'buyer' | 'seller'
}

export interface Order {
  created_at: string
  id: number
  auction?: Auction
  account?: Account
  duration_days: number
  deleted: boolean
  expires_at: string
  original_total: number
  proxy: string | null
  version: string
  wallet: string
  price: number
  total: number
  mining_deposit: number
  auction_fee: number
  status: OrderStatus
  previous_status: OrderStatus
  payments: Payment[]
  can_apply_promo_code: boolean
  payment_address: string
  account_id: number
  checkout_url?: string
  promo_code?: PromoCode
  type: OrderType
  cancellation_reason?: string
  messages: OrderMessage[]
}

export interface Invoice {
  report: InvoiceReport
  figure: any
}

export interface InvoiceReport {
  body: string
  subject: string
  duration: string
  auction_url: string
  uptime_days: number
  balance_sats: number
  deposit_sats: number
  epoch_number: number
  hashrate_end: string
  pool_account: string
  auction_title: string
  downtime_days: number
  hashrate_days: number
  hashrate_thps: number
  mining_status: string
  bid_price_sats: number
  hashrate_start: string
  remaining_days: number
  deposit_percent: number
  payment_address: string
  stratum_address: string
  auction_fee_sats: number
  percent_complete: number
  pool_worker_name: string
  remaining_status: string
  time_of_completion: any
  anticipated_hashrate: number
  average_hashrate_thps: number
  expected_time_of_completion: any
}

export interface OrderDetail {
  invoice: Invoice
  order: Order
  shares: Shares
}
export interface Shares {
  id: number
  timestamp: string
  stratums_id: number
  accepted: number
  rejected: number
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

export interface ProxyBidUpdate {
  maximum_amount: number
  account: Account
}
