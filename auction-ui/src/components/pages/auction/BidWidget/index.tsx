/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
'use client'

import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import SatsSvg from 'src/assets/svg/sats.svg'
import Countdown from 'react-countdown'
import { AuctionStatus, Auction, BidsEntityOrCurrentBid, Winner } from 'src/api/auction/types'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Form, Input } from 'src/core'
import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { useNotificationContext } from 'src/core/providers/NotificationProvider'
import ws from 'src/lib/ws'
import { formatMoney } from 'src/utils/currency'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { useSatsToFiat } from 'src/hooks'
import { CountdownWidget } from 'src/components/pages/auction/BidWidget/countdownWidget'
import styles from './index.module.css'
import { useWebsocketContext } from 'src/providers/WebsocketProvider'

interface Props {
  auction: Auction
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
  proxy_bid?: BidsEntityOrCurrentBid[]
  winner?: Winner
  slug?: string
}

const BidWidget = ({ auction, current_bid }: Props) => {
  const { isLoading, token } = useAccountContext()
  const { success, error } = useNotificationContext()
  const { isSocketReady } = useWebsocketContext()

  const [bidAmount, setBidAmount] = useState<string>('')
  const [bidAmountErrors, setBidAmountErrors] = useState<string[] | undefined>(undefined)
  const [loadingPlaceBid, setLoadingPlaceBid] = useState<boolean>(false)

  const priceInFiat = useSatsToFiat({ initialValue: 0, bid: current_bid || 0 })

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

  function handleBidAmountChange(val: string | number) {
    setBidAmountErrors(undefined)
    if (val === '') {
      setBidAmount(val.toString())

      return
    }

    setBidAmount(val.toString())
  }

  async function handlePlaceBid() {
    if (!token || (bidAmountErrors && bidAmountErrors.length > 0)) {
      return
    }

    validateBidAmount(bidAmount)

    if (bidAmountErrors && bidAmountErrors.length > 0) return

    setLoadingPlaceBid(true)
    // setBidAmount('')

    try {
      const res: any = await ws.request('place_bid', {
        auction_id: auction.id,
        amount: Number(bidAmount),
      })

      if (res.error) {
        throw new Error(res.error)
      }

      setLoadingPlaceBid(false)
      setBidAmount('')
      success({
        title: res.title,
        content: res.message,
      })
    } catch (ex: any) {
      console.error(ex)
      error({
        title: 'Error',
        content: ex.message,
      })
      setLoadingPlaceBid(false)
    } finally {
      setLoadingPlaceBid(false)
    }
  }

  const auctionStatus = () => {
    if (auction.status === AuctionStatus.Scheduled) {
      return 'Start date:'
    }
    if (auction.status === AuctionStatus.Active) {
      return 'End date:'
    }
    if (auction.status === AuctionStatus.Completed) {
      return 'Auction ended:'
    }
  }

  return (
    <>
      <div className="flex w-full flex-col items-center rounded-xl bg-white p-4">
        <p className="mb-4 flex items-center text-sm text-dark-100">
          {auctionStatus()}
          <span className="ml-1 text-sm font-medium text-black">{format(parseISO(auction.end_at), 'MMMM dd, yy - h:mm aa')}</span>
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
          renderer={countdownProps => CountdownWidget(countdownProps, auction)}
        />
        <div className="max-w-md text-center lg:w-full">
          {auction.status === AuctionStatus.Active && (
            <>
              {current_bid && (
                <div className="mt-7 w-full rounded-xl bg-gray-200 p-4">
                  <h5>Current bid</h5>
                  <Tooltip placement="left">
                    <TooltipTrigger>
                      <h1 className="flex items-center justify-center">
                        {formatMoney(current_bid.bid)} <SatsSvg className="ml-2" />
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
                      ${formatMoney(priceInFiat)}
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
              {current_bid === null && (
                <div className="mt-7 w-full rounded-xl bg-gray-200 p-4">
                  <span>Be the first to place a bid</span>
                </div>
              )}

              {!isLoading && !token && <p className="mt-8 text-red-500">You need to be logged in to place a bid</p>}

              {!isLoading && token && (
                <>
                  <div className="mt-5 w-full">
                    <p className="text-base font-semibold text-dark-100">Enter your bid</p>
                    <div className="mt-2 flex flex-col">
                      <Form className="gap-4" onSubmit={handlePlaceBid} disabled={loadingPlaceBid || !isSocketReady}>
                        <Form.Field required errors={bidAmountErrors}>
                          <Input
                            type="number"
                            name="bid_amount"
                            value={bidAmount}
                            onChange={handleBidAmountChange}
                            placeholder="Bid amount"
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
      <BidWidgetCalculator auction={auction} />
    </>
  )
}

interface BidWidgetCalculatorProps {
  auction: Auction
}

function BidWidgetCalculator({ auction }: BidWidgetCalculatorProps) {
  const [hashPrice, setHashPrice] = useState(0)
  const [speed, setSpeed] = useState(auction.auction_meta.hashrate)
  const [duration, setDuration] = useState(auction.auction_meta.days_of_mining)
  const futureMiningPayout = hashPrice * Number(speed) * Number(duration) || 0
  const priceInFiat = useSatsToFiat({ initialValue: 0, bid: futureMiningPayout })

  return (
    <div className="mt-4 flex w-full flex-col items-start rounded-xl bg-white px-4 py-3 opacity-70">
      <h1 className="mb-2 text-base">Hash price</h1>
      <div className="flex items-center justify-between">
        <input
          onChange={e => {
            setHashPrice(parseInt(e.target.value) || 0)
          }}
          type="text"
          disabled
          className="w-full rounded-lg border border-gray-400 p-2 text-center text-lg"
          id="#1"
          placeholder="0"
          value={formatMoney(hashPrice)}
        />
        <p className="ml-1 text-right text-sm text-dark-100">Sats per TH/s/Day</p>
      </div>
      <label htmlFor="#hashprice" className="mt-4 flex w-full max-w-[336px] items-center">
        <input
          onChange={e => {
            setHashPrice(parseInt(e.target.value) || 0)
          }}
          className={`${styles['range-slider']} w-full`}
          type="range"
          id="#hashprice"
          name="volume"
          min="0"
          max="800"
          value={hashPrice}
        />
      </label>
      <div className="mt-4">
        <h1 className="text-base">Future returns</h1>

        <Tooltip>
          <TooltipTrigger>
            <h3 className="flex items-center" id="formula-result-#11">
              <span>{formatMoney(futureMiningPayout) || 0}</span> <SatsSvg className="ml-2" />
            </h3>
          </TooltipTrigger>
          <TooltipContent className="w-max max-w-fit rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
            ${formatMoney(priceInFiat)}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export default BidWidget
