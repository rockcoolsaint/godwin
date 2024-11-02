import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import AuctionSchedule from 'src/components/pages/home/AuctionSchedule'
import Link from 'src/components/shared/Link'

interface AuctionOfTheDay {
  auction: AuctionOfTheDayResponse
  auctionsData: Auction[]
  children?: React.ReactNode
}

function SellerBox({ name, capacity, desc }: { name: string, capacity: string, desc: string }) {
  return (
    <div className="shadow-level-2 w-64 rounded-3xl border bg-white px-3 py-6 shadow-md flex flex-col justify-between h-full">
      <div className="flex-grow">
        <h2 className="mb-4 text-xl font-semibold">{name}</h2>
        <p className="mb-4 text-medium text-dark-100">{desc}</p>
        <p className="mb-4 text-sm text-dark-100">Capacity: {capacity}</p>
      </div>
      <Link
        className="mt-auto flex w-full items-center justify-center rounded-lg bg-gradient p-3 text-base text-white hover:bg-gradient-hover"
        href={`/auction-market`}
      >
        View auctions
      </Link>
    </div>
  )
}

export default function UpcomingAuctions({ auctionsData, children }: AuctionOfTheDay) {
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center overflow-auto">
        <h1 className="mt-10 w-10/12 text-center font-chakra text-4xl text-navy lg:w-full lg:text-5xl 2xl:text-7xl">Auctions</h1>

        <AuctionSchedule auctionsData={auctionsData} showTitle={false} />

        {/* Seller Boxes */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <SellerBox name="Baer Corp" capacity="5 PH/s" desc="Connecting small-scale bitcoin miners since 2022." />
          <SellerBox name="Midwest Mining" capacity="10 PH/s" desc="We're a local stranded natural gas mining farm in the Midwest." />
          <SellerBox name="Mining around the world" capacity="varies" desc="New mining farms on Rigly" />
        </div>
      </div>
      {/* SUPPORT */}
      {children}
    </>
  )
}
