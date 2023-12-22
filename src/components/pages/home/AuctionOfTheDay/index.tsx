import Image from 'next/image'
import { AuctionOfTheDayResponse, AuctionStatus } from 'src/api/auction/types'
import Link from 'src/components/shared/Link'
import { useTranslation } from 'src/hooks'
import { format, parseISO } from 'date-fns'
import SatsSvg from 'src/assets/svg/sats.svg'
import { formatMoney } from 'src/utils/currency'
import { isDateBefore } from 'src/utils/date'
import * as miner from 'src/assets/jpg/mining.jpeg'
interface AuctionOfTheDay {
  auction: AuctionOfTheDayResponse
}

export default function AuctionOfTheDay({ auction: auctionResponse }: AuctionOfTheDay) {
  const { t } = useTranslation()

  if (!auctionResponse || !auctionResponse.auction) {
    return null
  }

  const { auction } = auctionResponse

  const start_iso = parseISO(auction.start_at)
  const end_iso = parseISO(auction.end_at)

  const start = format(start_iso, 'do MMM, yy h:mmaa')
  const end = format(end_iso, 'do MMM, yy h:mmaa')

  const isAuctionEnded = isDateBefore(auction.end_at)

  function renderAuctionStatusTag() {
    if (isAuctionEnded) {
      return <p className="mb-4 rounded bg-tag-red/[.2] p-2 text-base font-semibold text-tag-red">{t('home.bid_closed')}</p>
    }

    if (auction.status === AuctionStatus.Scheduled) {
      return (
        <p className="text-tag-yellow mb-4 rounded bg-yellow-50  p-2 py-1 text-base font-semibold text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
          Upcoming auction
        </p>
      )
    }

    return <p className="mb-4 rounded bg-tag-green/[.2] p-1 px-2 text-sm font-normal text-tag-green">{t('home.bid_open')}</p>
  }

  const renderBidCount = () => {
    if (auction.bid_count === 1) {
      return 'bid'
    }

    return 'bids'
  }

  // #EBF7FE, #316AEF
  return (
    <section className="auction-of-the-day-gradient flex w-full flex-col items-center justify-center px-4 py-28 md:px-0">
      <h1 className="mb-10 font-chakra text-7xl text-navy">Auction of the day</h1>
      <div className="max-w-md rounded-3xl bg-white px-3 py-6 shadow-md md:px-6 lg:max-w-4xl">
        <div className="flex flex-col lg:flex-row">
          <Image
            className="max-h-96 rounded-3xl"
            src={auction.auction_meta.site_photo || miner}
            alt="auction of the day"
            width={550}
            height={305}
          />
          <div className="ml-0 mt-4 flex flex-col items-start justify-between lg:ml-9 lg:mt-0">
            {renderAuctionStatusTag()}
            <h1 className="mb-4 text-2xl font-semibold">{auction.title}</h1>
            <div className="flex justify-between">
              <aside>
                <p className="text-sm text-dark-100">{t('home.bid_start_date')}:</p>
                <p className="text-xs font-normal">{start}</p>
              </aside>
              <aside className="ml-4">
                <p className="text-sm text-dark-100">{t('home.bid_end_date')}:</p>
                <p className="text-xs font-normal">{end}</p>
              </aside>
            </div>
            <hr className="my-4 block w-full border" />
            <p className="mb-4 rounded bg-tag-blue/[.2] p-1 px-2 text-sm text-tag-blue">
              {auction.bid_count} {renderBidCount()}
            </p>
            <div className="flex w-full justify-between">
              <aside>
                <p className="mb-1 text-sm text-dark-100">{t('home.start_bid_amount')}:</p>
                <p className="flex items-center text-xs font-medium">
                  {formatMoney(auction.starting_bid)} <SatsSvg className="ml-2" />
                </p>
              </aside>
              {auction.bid_count > 0 && (
                <aside className="md:mr-9">
                  <p className="mb-1 text-sm text-dark-100">Current bid:</p>
                  <p className="flex items-center text-xs font-medium">
                    {formatMoney(auction.current_bid)} <SatsSvg className="ml-2" />
                  </p>
                </aside>
              )}
            </div>
            <Link
              className="mt-4 flex w-full items-center justify-center rounded-lg bg-gradient p-3 text-base text-white hover:bg-gradient-hover"
              href={'/auctions/' + auction.slug}
            >
              {t('home.view_details')}
            </Link>
          </div>
        </div>
      </div>

      {/* SUPPORT */}

      <h1 className="mt-36 font-chakra text-7xl text-navy">Support</h1>
      <p className="text-center text-xl text-navy md:w-6/12  lg:text-3xl">
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
            <Link href="#" className="flex rounded-lg bg-navy px-8 py-4 font-epilogue text-lg text-white hover:opacity-90" target="_blank">
              Read the article
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
