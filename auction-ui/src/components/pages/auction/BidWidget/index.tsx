/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
'use client'

import { ExclamationCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import SatsSvg from 'src/assets/svg/sats.svg'
import Countdown from 'react-countdown'
import { Auction } from 'src/types'
import { AuctionStatus, BidsEntityOrCurrentBid, Winner } from 'src/api/auction/types'
import { placeBid } from 'src/api/bids/placeBid'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Form, Input } from 'src/core'
import { useState } from 'react'
import { format, parseISO } from 'date-fns'

interface Props {
  auction: Auction
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid | null
  proxy_bid?: BidsEntityOrCurrentBid[]
  winner?: Winner
  slug?: string
}

const BidWidget = ({ auction, current_bid }: Props) => {
  const { loading, token } = useAccountContext()

  const [bidAmount, setBidAmount] = useState<string>('')
  const [bidAmountErrors, setBidAmountErrors] = useState<string[] | undefined>(undefined)
  const [loadingPlaceBid, setLoadingPlaceBid] = useState<boolean>(false)

  // TODO: move to reusable utils.
  function validateBidAmount(val: string | number) {
    const num = Number(val)
    const errors = []

    if (current_bid !== null && num <= current_bid.bid) {
      errors.push('Bid must be higher than current highest bid')
    }

    if (num <= 0) {
      errors.push('Bid must be higher than 0')
    }

    setBidAmountErrors(errors)
  }

  function handleBidAmountBlur(val: string | number) {
    setBidAmount(Number(val).toString())
    validateBidAmount(val)
  }

  function handleBidAmountInput(val: string | number) {
    if (val === '') {
      setBidAmountErrors(undefined)
      setBidAmount(val.toString())

      return
    }

    validateBidAmount(val)
    setBidAmount(val.toString())
  }

  async function handlePlaceBid() {
    if (!token || (bidAmountErrors && bidAmountErrors.length > 0)) {
      return
    }

    setLoadingPlaceBid(true)
    setBidAmount('')

    try {
      await placeBid({ list_id: auction.id, bid_amnt: Number(bidAmount) }, token)
    } catch (ex) {
      console.error(ex)
    } finally {
      setLoadingPlaceBid(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center rounded-xl bg-white p-4">
      <p className="mb-4 flex items-center text-sm text-dark-100">
        Bid End Date:{' '}
        <span className="ml-1 text-sm font-medium text-black">{format(parseISO(auction.end_at), 'MMMM dd, yyyy - h:mm aa')}</span>
        <ExclamationCircleIcon className="ml-1 h-4 w-4" />
      </p>
      <Countdown className="bg-red-200" date={new Date(auction.end_at)} renderer={countdownWidget}>
        <span className="text-center">Bidding for this auction is now being closed</span>
      </Countdown>
      <div className="d-flex w-full text-center">
        {auction.status === AuctionStatus.Scheduled && <div>Auction has not started</div>}
        {auction.status === AuctionStatus.Completed && <div className="text-red-500">Auction ended</div>}
        {auction.status === AuctionStatus.Active && (
          <>
            {current_bid !== null && (
              <div className="mt-7 w-full rounded-xl bg-gray-200 p-4">
                <h5>Current bid</h5>
                <h1 className="flex items-center justify-center">
                  {current_bid.bid} <SatsSvg className="ml-2" />
                </h1>
              </div>
            )}
            {current_bid === null && (
              <div className="mt-7 w-full rounded-xl bg-gray-200 p-4">
                <span>Be the first to place a bid</span>
              </div>
            )}

            {!loading && !token && <p className="mt-8 text-red-500">You need to be logged in to place a bid</p>}

            {!loading && token && (
              <>
                <div className="mt-5 w-full">
                  <p className="text-base font-semibold text-dark-100">Enter your bid</p>
                  <div className="mt-2 flex flex-col">
                    <Form onSubmit={handlePlaceBid} disabled={loadingPlaceBid || (bidAmountErrors && bidAmountErrors.length > 0)}>
                      <Form.Field required>
                        <Input
                          type="number"
                          name="bid_amount"
                          value={bidAmount}
                          onInput={handleBidAmountInput}
                          onBlur={handleBidAmountBlur}
                          placeholder="Bid amount"
                          min="0"
                          step="1"
                        />

                        {bidAmountErrors && (
                          <div className="mt-4 flex flex-col">
                            {bidAmountErrors.map((err, i) => (
                              <span key={i} className="text-sm text-red-500">
                                {err}
                              </span>
                            ))}
                          </div>
                        )}
                      </Form.Field>

                      <Form.Submit>Place bid</Form.Submit>
                    </Form>
                    {/* <Input className="mb-2 w-full rounded-lg border border-gray-100 p-2 text-center" placeholder="0" type="number" />
                      <Input className="mb-2 w-full rounded-lg border border-gray-100 p-2" placeholder="Display name" type="text" />
                      <Input className="mb-2 w-full rounded-lg border border-gray-100 p-2" placeholder="Email address" type="text" /> */}
                  </div>
                </div>
              </>
            )}
          </>
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
            <span className="gradient-text w-8 text-2xl font-semibold">{days}</span> <span className="text-sm text-dark-100">days</span>
          </p>
          <p className=" flex items-center">
            <span className="gradient-text w-8 text-2xl font-semibold">{hours}</span> <span className=" text-sm text-dark-100">hours</span>
          </p>
          <p className="ml-1 flex items-center">
            <span className="gradient-text w-8 text-2xl font-semibold">{minutes}</span> <span className=" text-sm text-dark-100">min</span>
          </p>
          <p className="ml-1 flex items-center">
            <span className="gradient-text w-8 text-2xl font-semibold">{seconds}</span> <span className=" text-sm text-dark-100">sec</span>
          </p>
        </div>
      </section>
    )
  }
}

export default BidWidget
