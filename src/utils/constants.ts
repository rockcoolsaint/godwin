export interface AuctionSortFilterItem {
  title: string
  slug: string | null
  sortKey: 'STATUS' | 'EPOCH' | 'CREATED_AT' | 'HASHRATE' | 'HIGHEST_BID' | 'GOING_HASHPRICE' | 'TIME_REMAINING'
  category: 'Sort by'
}

export interface AuctionStatusFilterItem {
  title: string
  slug: string | null
  filterKey: 'scheduled' | 'active' | 'completed' | string
  path: string
  category: 'Status'
}

export interface AuctionTypeFilterItem {
  title: string
  slug: string | null
  filterKey: 'immediate_delivery' | 'forward_date' | 'upfront_payment' | string
  category: 'Type'
}

export const defaultSort: AuctionSortFilterItem = {
  title: 'Status',
  slug: 'status',
  sortKey: 'STATUS',
  category: 'Sort by',
}

export const sorting: AuctionSortFilterItem[] = [
  defaultSort,
  { title: 'Epoch', slug: 'epoch', sortKey: 'EPOCH', category: 'Sort by' },
  { title: 'Date created', slug: 'created_at', sortKey: 'CREATED_AT', category: 'Sort by' },
  { title: 'Hashrate', slug: 'hashrate', sortKey: 'HASHRATE', category: 'Sort by' },
  { title: 'Highest Bid', slug: 'highest_bid', sortKey: 'HIGHEST_BID', category: 'Sort by' },
  { title: 'Hashprice', slug: 'going_hashprice', sortKey: 'GOING_HASHPRICE', category: 'Sort by' },
  { title: 'Time Remaining', slug: 'time_remaining', sortKey: 'TIME_REMAINING', category: 'Sort by' },
]

export const defaultFilter: AuctionStatusFilterItem = {
  title: 'All',
  slug: null,
  filterKey: '',
  path: '/collections',
  category: 'Status',
}

export const filtering: AuctionStatusFilterItem[] = [
  defaultFilter,
  { title: 'Scheduled', slug: 'scheduled', filterKey: 'scheduled', path: '/collections/scheduled', category: 'Status' },
  { title: 'Active', slug: 'active', filterKey: 'active', path: '/collections/active', category: 'Status' },
  { title: 'Completed', slug: 'completed', filterKey: 'completed', path: '/collections/completed', category: 'Status' },
]

export const defaultType: AuctionTypeFilterItem = {
  title: 'All',
  slug: null,
  filterKey: '',
  category: 'Type',
}

export const auctionTypeFiltering: AuctionTypeFilterItem[] = [
  defaultType,
  { title: 'Immediate Delivery', slug: 'immediate_delivery', filterKey: 'immediate_delivery', category: 'Type' },
  { title: 'Forward Date', slug: 'forward_date', filterKey: 'forward_date', category: 'Type' },
  { title: 'Upfront Payment', slug: 'upfront_payment', filterKey: 'upfront_payment', category: 'Type' },
]
