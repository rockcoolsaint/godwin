/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
'use client'

import { ExclamationCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import SatsSvg from 'src/assets/svg/sats.svg'
import Countdown, { zeroPad } from 'react-countdown'
import { Auction } from 'src/types'
import { AuctionStatus, BidsEntityOrCurrentBid, Winner } from 'src/api/auction/types'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Form, Input } from 'src/core'
import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { useNotificationContext } from 'src/core/providers/NotificationProvider'
import ws from 'src/lib/ws'

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
  const { success, error } = useNotificationContext()

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
    if (val === '') {
      return
    }

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
      const res: any = await ws.request('place_bid', {
        auction_id: auction.id,
        amount: Number(bidAmount),
      })

      if (res.error) {
        throw new Error(res.error)
      }

      success({
        title: 'Bid placed',
        content: 'Your bid has been placed.',
      })
    } catch (ex: any) {
      console.error(ex)
      error({
        title: 'Error',
        content: ex.message,
      })
    } finally {
      setLoadingPlaceBid(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center rounded-xl bg-white p-4">
      <p className="mb-4 flex items-center text-sm text-dark-100">
        {auction.status === AuctionStatus.Scheduled && <span>Start date:</span>}
        {auction.status === AuctionStatus.Active && <span>End date:</span>}
        {auction.status === AuctionStatus.Completed && <span>Auction ended:</span>}
        <span className="ml-1 text-sm font-medium text-black">{format(parseISO(auction.end_at), 'MMMM dd, yyyy - h:mm aa')}</span>
        <ExclamationCircleIcon className="ml-1 h-4 w-4" />
      </p>
      {auction.status === AuctionStatus.Scheduled && (
        <div className="mb-4 flex flex-col items-center gap-2">
          <span className="text-sm text-dark-100">Starting in:</span>
        </div>
      )}
      <Countdown
        key={auction.status}
        className="bg-red-200"
        date={auction.status === AuctionStatus.Scheduled ? new Date(auction.start_at) : new Date(auction.end_at)}
        zeroPadTime={2}
        renderer={countdownProps => countdownWidget(countdownProps, auction)}
      />
      <div className="w-2/4 text-center lg:w-full">
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
                    <Form
                      className="gap-4"
                      onSubmit={handlePlaceBid}
                      disabled={loadingPlaceBid || (bidAmountErrors && bidAmountErrors.length > 0)}
                    >
                      <Form.Field required errors={bidAmountErrors}>
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
                      </Form.Field>

                      <Form.Submit>Place bid</Form.Submit>
                    </Form>
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
  days: string | number
  hours: string | number
  minutes: string | number
  seconds: string | number
  completed?: boolean | number
}

const countdownWidget = ({ days, hours, minutes, seconds, completed }: CountdownWidgetProps, auction: Auction): JSX.Element => {
  if (completed) {
    if (auction.status === AuctionStatus.Scheduled) {
      return <></>
    }

    return <span className="text-center text-red-400">Auction ended</span>
  } else {
    return (
      <section className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center">
          <ClockIcon className="h-5 w-5 text-dark-100" />
          <p className="ml-2 flex items-center">
            <span className="gradient-text text-2xl font-semibold">{days}</span> <span className="ml-1 text-sm text-dark-100">days</span>
          </p>
          <p className="ml-2 flex items-center">
            <span className="gradient-text text-2xl font-semibold">{hours}</span> <span className="ml-1 text-sm text-dark-100">hours</span>
          </p>
          <p className="ml-2 flex items-center">
            <span className="gradient-text text-2xl font-semibold">{zeroPad(minutes)}</span>{' '}
            <span className="ml-1 text-sm text-dark-100">min</span>
          </p>
          <p className="ml-2 flex items-center">
            <span className="gradient-text w-8 text-2xl font-semibold">{zeroPad(seconds)}</span>{' '}
            <span className="ml-1 text-sm text-dark-100">sec</span>
          </p>
        </div>
      </section>
    )
  }
}

export default BidWidget
