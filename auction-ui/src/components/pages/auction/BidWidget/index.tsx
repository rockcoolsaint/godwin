/* eslint-disable react/jsx-no-bind */
'use client'

import { ExclamationCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import SatsSvg from 'src/assets/svg/sats.svg'
import Countdown from 'react-countdown'
import { Auction } from 'src/types'
import { BidsEntityOrCurrentBid, Winner } from 'src/api/auction/types'
import { placeBid } from 'src/api/bids/placeBid'

interface Props {
  auction: Auction
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
  proxy_bid?: BidsEntityOrCurrentBid[]
  winner?: Winner
  slug?: string
}

const BidWidget = ({ auction, bids, current_bid, proxy_bid, winner, slug }: Props) => {
  function handlePlaceBid() {
    placeBid({ list_id: auction.id, bid_amnt: 1000 })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div className="ml-4 flex w-[25%] flex-col items-center rounded-xl bg-white p-4">
      <p className="mb-4 flex items-center text-sm text-dark-100">
        Bid End Date: <span className="text-sm font-medium text-black">{auction.expiry_at}</span>
        <ExclamationCircleIcon className="ml-1 h-4 w-4" />
      </p>
      <div className="d-flex w-full text-center">
        {auction.expiry_at ? (
          <>
            <Countdown
              className="bg-red-200"
              date={new Date(auction.auction_start_date) > new Date() ? new Date(auction.auction_start_date) : new Date(auction.expiry_at)}
              renderer={countdownWidget}
            >
              <span className="text-center">Bidding for this auction is now being closed</span>
            </Countdown>
            <button onClick={() => handlePlaceBid()} className="mt-4 w-full rounded-lg bg-gradient p-3 text-white hover:bg-gradient-hover">
              Place bid
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

interface CountdownWidgetProps {
  days?: string | number
  hours?: string | number
  minutes?: string | number
  seconds?: string | number
  completed?: boolean | number
}

const countdownWidget = ({ days, hours, minutes, seconds, completed }: CountdownWidgetProps): JSX.Element => {
  if (completed) {
    return <span className="text-center">Bidding for this auction is now being closed</span>
  } else {
    return (
      <section className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center">
          <ClockIcon className="h-5 w-5 text-dark-100" />
          <p className="flex items-center">
            <h4 className="gradient-text w-8 text-2xl font-semibold">{days}</h4> <span className="text-sm text-dark-100">days</span>
          </p>
          <p className=" flex items-center">
            <h4 className="gradient-text w-8 text-2xl font-semibold">{hours}</h4> <span className=" text-sm text-dark-100">hours</span>
          </p>
          <p className="ml-1 flex items-center">
            <h4 className="gradient-text w-8 text-2xl font-semibold">{minutes}</h4> <span className=" text-sm text-dark-100">min</span>
          </p>
          <p className="ml-1 flex items-center">
            <h4 className="gradient-text w-8 text-2xl font-semibold">{seconds}</h4> <span className=" text-sm text-dark-100">sec</span>
          </p>
        </div>
        <div className="mt-7 w-full rounded-xl bg-gray-200 p-4">
          <h5>Current bid</h5>
          <h1 className="flex items-center justify-center">
            1,5000 <SatsSvg className="ml-2" />{' '}
          </h1>
        </div>
        <div className="mt-5 w-full">
          <p className="text-base font-semibold text-dark-100">Enter your bid</p>
          <div className="mt-2 flex flex-col">
            <input className="mb-2 w-full w-full rounded-lg border border-gray-100 p-2 text-center" placeholder="0" type="number" />
            <input className="mb-2 w-full w-full rounded-lg border border-gray-100 p-2" placeholder="Display name" type="text" />
            <input className="mb-2 w-full w-full rounded-lg border border-gray-100 p-2" placeholder="Email address" type="text" />
          </div>
        </div>
      </section>
    )
  }
}

export default BidWidget
