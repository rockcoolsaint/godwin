export const revalidate = 0

import { Suspense } from 'react'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import AuctionSchedule from 'src/components/pages/home/AuctionSchedule'
import Link from 'src/components/shared/Link'
import { TableSkeletonLoader } from 'src/components/shared/TableSkeletonLoader'
import Container from 'src/core/components/Container'

export default async function AuctionMarketPage() {
  const activeAuctions = await getAllAuctions({
    limit: 1_000,
    group_by: 'auction_status',
    auction_status: 'active',
  })

  const completedAuctions = await getAllAuctions({
    limit: 20,
    group_by: 'auction_status',
    auction_status: 'completed',
    sorting: 'desc',
  })

  return (
    <Container className="py-12 xl:w-full">
      <Suspense fallback={<TableSkeletonLoader title="Auction Market" />}>
        <div className="flex flex-col items-center">
          <h1 className="font-chakra text-lg font-bold text-navy lg:text-4xl">Active auctions</h1>
          <AuctionSchedule auctionsData={activeAuctions.results} />

          <h1 className="mt-20 font-chakra text-lg font-bold text-navy lg:text-4xl">Completed auctions</h1>
          <AuctionSchedule auctionsData={completedAuctions.results} />
          <Link
            href="/collections/completed"
            className="mt-12 rounded-xl bg-navy p-4 font-epilogue text-sm font-normal text-white sm:p-2 lg:p-4"
          >
            View more listings
          </Link>
        </div>
      </Suspense>
    </Container>
  )
}
