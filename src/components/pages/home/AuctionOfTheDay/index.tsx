import { Auction, AuctionOfTheDayResponse } from 'src/api/auction/types'
import Link from 'src/components/shared/Link'
import AuctionSchedule from 'src/components/pages/home/AuctionSchedule'
interface AuctionOfTheDay {
  auction: AuctionOfTheDayResponse
  auctionsData: Auction[]
}

export default function AuctionOfTheDay({ auctionsData }: AuctionOfTheDay) {
  return (
    <section className="auction-of-the-day-gradient flex w-full flex-col items-center justify-center px-4 py-28 md:px-0">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center">
        <h1 className="mt-10 w-10/12 text-center font-chakra text-4xl text-navy lg:w-full lg:text-7xl">Auction Market</h1>

        <AuctionSchedule auctionsData={auctionsData} showTitle={false} />
      </div>
      {/* SUPPORT */}
      <>
        <h1 className="mt-36 font-chakra text-4xl text-navy lg:text-7xl">Support</h1>
        <p className="text-center text-xs text-navy md:w-6/12 md:text-xl  lg:text-3xl">
          Whether you&apos;re brand new to mining, or a seasoned bitcoiner, our support team is here to answer your questions
        </p>

        <div className="mx-auto mt-14 flex flex-col justify-center md:items-center md:px-10 lg:flex-row xl:px-20">
          <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 md:mb-0 md:w-8/12 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-12">
            <div className="">
              <h2 className="mb-5 w-10/12 text-xl font-semibold text-navy xl:text-3xl">Learn how Bitcoin mining works</h2>
              <p className="mb-5 text-lg text-black xl:text-xl">
                There are lots of reasons why someone chooses to mine bitcoin. Read more in this essay from Braiins.
              </p>
            </div>
            <div className="">
              <Link
                href="https://braiins.com/blog/why-mine-bitcoin-braiins-mining"
                className="flex rounded-lg bg-navy px-8 py-4 font-epilogue text-lg text-white hover:opacity-90"
                target="_blank"
              >
                Read the article
              </Link>
            </div>
          </div>

          <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 sm:mx-20 md:mx-0 md:my-8 md:w-8/12 lg:mx-8 lg:my-0 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-16">
            <h2 className="mb-5 w-10/12 text-xl font-semibold text-navy xl:text-3xl">How to bid on auctions</h2>
            <p className="mb-5 text-lg text-black xl:text-xl">
              The Rigly experience is quick and seamless, giving you the opportunity to start mining right away.
            </p>

            <div className="">
              <Link
                href="https://blog.rigly.io/how-to-bid-on-hashrate/"
                className="flex rounded-lg bg-navy px-8 py-4 font-epilogue text-lg text-white hover:opacity-90"
                target="_blank"
              >
                Read the article
              </Link>
            </div>
          </div>

          <div className="mb-12 flex w-full flex-col items-start rounded-xl border border-gray-400 bg-white p-8 md:mb-0 md:w-8/12 md:px-6 xl:w-4/12 xl:px-8 2xl:w-3/12 2xl:px-16">
            <div className="">
              <h2 className="mb-5 w-10/12 text-xl font-semibold text-navy xl:text-3xl">Want to sell your hashrate</h2>
              <p className="mb-5 text-lg text-black xl:text-xl">
                Rigly&apos;s marketplace allows miners to sell their hash in a forward agreement and focus on optimizing operations.
              </p>
            </div>
            <div className="">
              <Link
                href="#"
                className="flex rounded-lg bg-navy px-8 py-4 font-epilogue text-lg text-white hover:opacity-90"
                target="_blank"
              >
                Read the article
              </Link>
            </div>
          </div>
        </div>
      </>
    </section>
  )
}
