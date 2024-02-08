export const revalidate = 0

import { Suspense } from 'react'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import AuctionSchedule from 'src/components/pages/home/AuctionSchedule'
import Link from 'src/components/shared/Link'
import { TableSkeletonLoader } from 'src/components/shared/TableSkeletonLoader'
import Container from 'src/core/components/Container'

export default async function AuctionMarketPage() {
  const auction = await getAllAuctions({
    limit: 1_000,
    group_by: 'auction_status',
    auction_status: 'active',
  })

  return (
    <Container className="py-12 xl:w-full">
      <Suspense fallback={<TableSkeletonLoader title="Auction Market" />}>
        <div className="flex flex-col items-center">
          <AuctionSchedule auctionsData={auction.results} />
          <Link
            href="/collections/completed"
            className="mt-12 rounded-xl bg-navy p-4 font-epilogue text-sm font-normal text-white sm:p-2 lg:p-4"
          >
            View completed auctions
          </Link>
        </div>
      </Suspense>
    </Container>
  )
}
