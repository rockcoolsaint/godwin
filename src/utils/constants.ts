export interface AuctionSortFilterItem {
  title: string
  slug: string | null
  sortKey: 'STATUS' | 'EPOCH' | 'CREATED_AT' | 'HASHRATE' | 'HIGHEST_BID' | 'GOING_HASHPRICE' | 'TIME_REMAINING'
}

export interface AuctionStatusFilterItem {
  title: string
  slug: string | null
  filterKey: 'scheduled' | 'active' | 'completed' | string
  path: string
}

export interface AuctionTypeFilterItem {
  title: string
  slug: string | null
  filterKey: 'immediate_delivery' | 'forward_date' | 'upfront_payment' | string
}

export const defaultSort: AuctionSortFilterItem = {
  title: 'Status',
  slug: 'status',
  sortKey: 'STATUS',
}

export const sorting: AuctionSortFilterItem[] = [
  defaultSort,
  { title: 'Epoch', slug: 'epoch', sortKey: 'EPOCH' },
  { title: 'Date created', slug: 'created_at', sortKey: 'CREATED_AT' },
  { title: 'Hashrate', slug: 'hashrate', sortKey: 'HASHRATE' },
  { title: 'Highest Bid', slug: 'highest_bid', sortKey: 'HIGHEST_BID' },
  { title: 'Hashprice', slug: 'going_hashprice', sortKey: 'GOING_HASHPRICE' },
  { title: 'Time Remaining', slug: 'time_remaining', sortKey: 'TIME_REMAINING' },
]

export const defaultFilter: AuctionStatusFilterItem = {
  title: 'All',
  slug: null,
  filterKey: '',
  path: '/collections',
}

export const filtering: AuctionStatusFilterItem[] = [
  defaultFilter,
  { title: 'Scheduled', slug: 'scheduled', filterKey: 'scheduled', path: '/collections/scheduled' },
  { title: 'Active', slug: 'active', filterKey: 'active', path: '/collections/active' },
  { title: 'Completed', slug: 'completed', filterKey: 'completed', path: '/collections/completed' },
]

export const defaultType: AuctionTypeFilterItem = {
  title: 'All',
  slug: null,
  filterKey: '',
}

export const auctionTypeFiltering: AuctionTypeFilterItem[] = [
  defaultType,
  { title: 'Immediate Delivery', slug: 'immediate_delivery', filterKey: 'immediate_delivery' },
  { title: 'Forward Date', slug: 'forward_date', filterKey: 'forward_date' },
  { title: 'Upfront Payment', slug: 'upfront_payment', filterKey: 'upfront_payment' },
]
