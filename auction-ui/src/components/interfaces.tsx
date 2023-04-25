import { Auction, AuctionMeta, AuctionStatus } from 'src/api/auction/types'

export interface RendererProps {
  days?: string | number
  hours?: string | number
  minutes?: string | number
  seconds?: string | number
  completed?: boolean | number
}

export interface HomePageProps {
  title: string
  description: string
  image_file: string
  products: productProps[]
  mining_info_image_1: string
  mining_info_title_1: string
  mining_info_description_1: string
  mining_info_url_1: string

  mining_info_image_2: string
  mining_info_title_2: string
  mining_info_description_2: string
  mining_info_url_2: string

  mining_info_image_3: string
  mining_info_title_3: string
  mining_info_description_3: string
  mining_info_url_3: string
  about_us_1_image: string
  about_us_1_title: string
  about_us_1_sub_title: string
  about_us_1_url: string

  about_us_2_image: string
  about_us_2_title: string
  about_us_2_sub_title: string
  about_us_2_url: string

  about_us_3_image: string
  about_us_3_title: string
  about_us_3_sub_title: string
  about_us_3_url: string
}

export interface productProfileProps {
  data: Auction
  currentBid?: number
}

export interface productProps {
  auction_meta: AuctionMeta
  auction_type: string
  bid_count: number | string
  id?: number | string
  created_at: string
  current_bid?: number | string
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
  payment_address: string
  payment_address_qr: string

  slug_category: string
  account: number | string
  category: number | string
  key?: number | string
}

export interface accountProps {
  id?: number | string
  first_name?: string
  email?: string
  username?: string
  last_name?: string
  is_paid?: boolean | string
  is_coupon_used?: boolean
  coupon?: string | string | number
  date_joined?: string | Date
  profile_pik?: string
  phone_number?: string | number
  address?: string
  key?: string | number
}

export interface bidProps {
  id: number | string
  account: accountProps
  created_at: string | Date
  updated_at: string | Date
  deleted?: boolean | string
  version?: string
  bid: number
  auction_list: string | number
  key?: string | number
}

export interface StringProps {
  data: string
}

export interface collectionProps {
  count: number
  next: string
  previous: string
  results: productProps[]
}

export interface winnerProps {
  id: number | string
  account: accountProps
  created_at: string
  updated_at: string
  deleted: boolean
  version: string
  position: number
  bid_price: number
  is_winner: boolean
  auction: string | number
}
