export const revalidate = 0

import Image from 'next/image'
import { Suspense } from 'react'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
// import Pagination from 'src/components/Pagination'
import AuctionSchedule from 'src/components/pages/home/AuctionSchedule'
import AuctionSchedulePaginated from 'src/components/pages/home/AuctionSchedulePaginated'
import { TableSkeletonLoader } from 'src/components/shared/TableSkeletonLoader'
import Container from 'src/core/components/Container'
import Input from 'src/core/components/Input'
import mining from 'src/assets/jpg/mining.jpeg'

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

  console.log('results:', activeAuctions.results)
  console.log()

  return (
    <Container className="py-12 xl:w-full">
      <div className="flex flex-col items-center gap-4 pb-4">
        <h1 className="font-chakra text-2xl font-bold text-navy lg:text-5xl">Auctions</h1>
        <div className="lg:items-star flex flex-col items-center gap-4 lg:flex-row">
          <div className="item-center flex flex-col gap-4 self-stretch">
            <div className="flex flex-col gap-2">
              <div className="font-chakra text-lg text-navy lg:text-4xl">Live Daily Auctions</div>
              <div className="flex flex-col gap-2 rounded-md border-2 border-black p-1 text-left text-xs">
                <div>- Bid Anonymously</div>
                <div>- Compete in live daily auctions from 9 to 4, M to F</div>
                <div>- Price determined by the market</div>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <Input className="text-2xl" id="email" type="text" autoComplete="off" autoCorrect="off" placeholder="Your email" />
                <button className="rounded-md bg-blue-700 px-2 py-1 text-xs text-white">Start bidding</button>
              </div>
            </div>
          </div>
          <Image src={mining} alt="placeholder" width={300} height={300} className="mb-4 rounded-md" />
        </div>
      </div>
      <Suspense fallback={<TableSkeletonLoader title="Auction Market" />}>
        <div className="flex flex-col items-center">
          {!!activeAuctions.results.length && (
            <>
              <h2 className="font-chakra text-lg font-bold text-navy lg:text-4xl">Active auctions</h2>
              <AuctionSchedule auctionsData={activeAuctions.results} />
            </>
          )}

          <h2 className="mt-20 font-chakra text-lg font-bold text-navy lg:text-4xl">Completed auctions</h2>

          <AuctionSchedulePaginated limit={limit} dataArgs={completedArgs} auctionsData={completedAuctions} />
        </div>
      </Suspense>
    </Container>
  )
}
