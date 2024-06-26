export const revalidate = 0

import { Suspense } from 'react'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
// import Pagination from 'src/components/Pagination'
import AuctionSchedule from 'src/components/pages/home/AuctionSchedule'
import AuctionSchedulePaginated from 'src/components/pages/home/AuctionSchedulePaginated'
import Link from 'src/components/shared/Link'
import { TableSkeletonLoader } from 'src/components/shared/TableSkeletonLoader'
import Container from 'src/core/components/Container'


export default async function AuctionMarketPage() {
  const limit = 20

  const activeAuctions = await getAllAuctions({
    limit: 1000,
    group_by: 'auction_status',
    auction_status: 'active',
  })

  const completedArgs = {
    group_by: 'auction_status',
    auction_status: 'completed',
    sorting: 'desc'
  }

  const completedAuctions = await getAllAuctions({
    ...completedArgs,
    limit: limit,
    offset: 0,
  })

  return (
    <Container className="py-12 xl:w-full">
      <Suspense fallback={<TableSkeletonLoader title="Auction Market" />}>
        <div className="flex flex-col items-center">
          <h1 className="font-chakra text-lg font-bold text-navy lg:text-4xl">Active auctions</h1>
          <AuctionSchedule auctionsData={activeAuctions.results} />

          <h1 className="mt-20 font-chakra text-lg font-bold text-navy lg:text-4xl">Completed auctions</h1>

          <AuctionSchedulePaginated 
            limit={limit}
            dataArgs={completedArgs}
            auctionsData={completedAuctions}
          />
        </div>
      </Suspense>
    </Container>
  )
}
