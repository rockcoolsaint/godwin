import { Suspense } from 'react'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import AuctionSchedule from 'src/components/pages/home/AuctionSchedule'
import AuctionSchedulePaginated from 'src/components/pages/home/AuctionSchedulePaginated'
import { TableSkeletonLoader } from 'src/components/shared/TableSkeletonLoader'
import Container from 'src/core/components/Container'
import AuctionInfo from './AuctionInfo'
import FAQs from './FAQs'

export const revalidate = 0

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
    sorting: 'desc',
  }

  const completedAuctions = await getAllAuctions({
    ...completedArgs,
    limit: limit,
    offset: 0,
  })

  // Define specific auction IDs
  // const specificAuctionIds = [1742, 1743] // tabconf auctions

  // Filter active auctions based on specific IDs
  // const filteredAuctions = completedAuctions.results.filter(auction => 
  //   specificAuctionIds.includes(auction.id)
  // )

  // console.log('Specific auctions fetched:', filteredAuctions)

  return (
    <Container className="py-12 xl:w-full">
      <AuctionInfo />
      <Suspense fallback={<TableSkeletonLoader title="Auction Market" />}>
        <div className="flex flex-col items-center">
          {!!activeAuctions.results.length && (
            <>
              <h2 className="mt-20 font-chakra text-lg font-bold text-navy lg:text-4xl">All active auctions</h2>
              <AuctionSchedule auctionsData={activeAuctions.results} />
            </>
          )}

          <h2 className="mt-20 font-chakra text-lg font-bold text-navy lg:text-4xl">Completed auctions</h2>
          <AuctionSchedulePaginated limit={limit} dataArgs={completedArgs} auctionsData={completedAuctions} />
        </div>
      </Suspense>
      <FAQs />
    </Container>
  )
}
