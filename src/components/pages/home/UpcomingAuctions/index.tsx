import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import AuctionSchedule from 'src/components/pages/home/AuctionSchedule'
interface AuctionOfTheDay {
  auction: AuctionOfTheDayResponse
  auctionsData: Auction[]
  children?: React.ReactNode
}

export default function UpcomingAuctions({ auctionsData, children }: AuctionOfTheDay) {
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center overflow-auto">
        <h1 className="mt-10 w-10/12 text-center font-chakra text-4xl text-navy lg:w-full lg:text-5xl 2xl:text-7xl">Upcoming Auctions</h1>

        <AuctionSchedule auctionsData={auctionsData} showTitle={false} />
      </div>
      {/* SUPPORT */}
      {children}
    </>
  )
}
