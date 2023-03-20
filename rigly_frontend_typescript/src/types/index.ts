export enum OrderPaymentStatus {
  Processing = "processing",
  Underpaid = "underpaid",
  Paid = "paid",
}

export type PromoCode = {
  code: string;
  discount: number;
};

export type OrderPayment = {
  id: number;
  order_id: string;
  payment_id: string;
  amount: number;
  original_amount: number;
  status: OrderPaymentStatus;
  checkout_url: string;
  can_apply_promo_code: boolean;
  is_first: boolean;
  has_initiated_payment: boolean;
  missing_amount?: number;
  promo_code?: PromoCode;
};

export enum OrderStatus {
  Unpaid = "unpaid",
  PaymentOneComplete = "paid_1",
  PaymentTwoComplete = "paid_2",
}

export type Order = {
  id: number;
  auction: Auction;
  price: number;
  total: number;
  mining_deposit: number;
  auction_fee: number;
  status: OrderStatus;
  payments: OrderPayment[];
};

export type Collection = {};

export enum AuctionTypeChoice {
  ImmediateDelivery = "immediate_delivery",
  ForwardDate = "forward_date",
  UpfrontPayment = "upfront_payment",
}

export type AuctionType = {
  type: AuctionTypeChoice;
  percentage: number;
};

export type AuctionMetadata = {
  profile_image_1: string;
  profile_image_2: string;
  profile_image_3: string;
  site_photo: string;
  live_feed_image: string;
  hash_price_image: string;
  power_source: string;
  asic_model: string;
  terms_link: string;
  hashrate: string;
  location: string;
  current_hash_price: string;
  days_of_mining: string;
  hours_per_day: string;
};

export type Auction = {
  id: number;
  user: number;
  title: string;
  sub_title: string;
  description: string;
  starting_bid: number;
  auction_start_date: Date;
  expiry_at: Date;
  is_expired: boolean;
  category: Collection;
  proxy_increment: number;
  is_auction_active: boolean;
  auction_status: string;
  slug_category: string;
  auction_type: AuctionType;
  payment_adress: string;
  payment_address_qr: string;
  auction_meta: AuctionMetadata;
};
