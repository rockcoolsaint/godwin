export const revalidate = 60

import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import { sorting, defaultSort, auctionTypeFiltering, defaultType } from 'src/utils/constants'
import CollectionList from 'src/components/pages/collections/CollectionsList'
import { getPaginationForSearchParams } from 'src/utils/pagination'
import { ErrorBoundary } from 'react-error-boundary'

export default async function CollectionsPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const { sort, auction_type, next } = searchParams as { [key: string]: string }
  const { sortKey } = sorting.find(item => item.slug === sort) || defaultSort
  const { filterKey } = auctionTypeFiltering.find(item => item.slug === auction_type) || defaultType
  const { limit } = getPaginationForSearchParams({ next: next })

  const auctions = await getAllAuctions({
    limit: limit,
    sort_by: sortKey.toLocaleLowerCase(),
    auction_type: filterKey.toLocaleLowerCase(),
  })

  return (
    <ErrorBoundary fallback={<div className="p-8">⚠️ Oops! something went wrong rendering collections</div>}>
      <CollectionList auction={auctions?.results} count={auctions?.count} />
    </ErrorBoundary>
  )
}
