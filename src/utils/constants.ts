export interface AuctionSortFilterItem {
  title: string
  slug: string | null
  sortKey: 'status' | 'epoch' | 'created_at' | 'hashrate' | 'highest_bid' | 'going_hashprice' | 'time_remaining' | string
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
  slug: null,
  sortKey: '',
  category: 'Sort by',
}

export const sorting: AuctionSortFilterItem[] = [
  defaultSort,
  { title: 'Epoch', slug: 'epoch', sortKey: 'epoch', category: 'Sort by' },
  { title: 'Date created', slug: 'created_at', sortKey: 'created_at', category: 'Sort by' },
  { title: 'Hashrate', slug: 'hashrate', sortKey: 'hashrate', category: 'Sort by' },
  { title: 'Highest Bid', slug: 'highest_bid', sortKey: 'highest_bid', category: 'Sort by' },
  { title: 'Hashprice', slug: 'going_hashprice', sortKey: 'going_hashprice', category: 'Sort by' },
  { title: 'Time Remaining', slug: 'time_remaining', sortKey: 'time_remaining', category: 'Sort by' },
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
