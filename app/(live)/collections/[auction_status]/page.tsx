import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import CollectionList from 'src/components/pages/collections/CollectionsList'
import { sorting, defaultSort, auctionTypeFiltering, defaultType } from 'src/utils/constants'
import { getPaginationForSearchParams } from 'src/utils/pagination'

export default async function AuctionStatusPage({
  params,
  searchParams,
}: {
  params: { auction_status: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { sort, auction_type, next } = searchParams as { [key: string]: string }
  const { sortKey } = sorting.find(item => item.slug === sort) || defaultSort
  const { filterKey } = auctionTypeFiltering.find(item => item.slug === auction_type) || defaultType
  const { limit } = getPaginationForSearchParams({ next: next })

  const auctions = await getAllAuctions({
    limit: limit,
    sort_by: sortKey.toLocaleLowerCase(),
    auction_type: filterKey.toLocaleLowerCase(),
    auction_status: params.auction_status,
  })

  return <CollectionList auction={auctions?.results} count={auctions?.count} />
}
