'use client'

import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import SatsSvg from 'src/assets/svg/sats.svg'
import Countdown from 'react-countdown'
import { AuctionStatus, Auction, BidsEntityOrCurrentBid, Winner } from 'src/api/auction/types'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Input } from 'src/core'
import { useCallback, useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import ws from 'src/lib/ws'
import { formatMoney } from 'src/utils/currency'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { useSatsToFiat } from 'src/hooks'
import { CountdownWidget } from 'src/components/pages/auction/BidWidget/countdownWidget'
import styles from './index.module.css'
import { useWebsocketContext } from 'src/providers/WebsocketProvider'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-hot-toast'
import { getHashPrice, HashpriceDict } from 'src/api/hashprice'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

interface Props {
  auction: Auction
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
  proxy_bid?: BidsEntityOrCurrentBid[]
  winner?: Winner
  slug?: string
}

interface FormInputs {
  bid: number
}

const validationSchema = (value = 5000) => {
  if (value <= 5000) {
    value = 5000
  } else {
    value += 1000
  }

  return yup.object().shape({
    bid: yup.number().integer().positive().min(value).required().typeError('bid must be a number'),
  })
}

const BidWidget = ({ auction, current_bid, bids }: Props) => {
  const { isLoading, token } = useAccountContext()
  const { isSocketReady } = useWebsocketContext()
  const [loadingPlaceBid, setLoadingPlaceBid] = useState<boolean>(false)
  const [epoch, setEpoch] = useState<HashpriceDict>({})

  const priceInFiat = useSatsToFiat({ initialValue: 0, bid: current_bid || 0 })

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

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema(bids[0]?.bid || auction?.starting_bid)),
    defaultValues: {
      bid: bids[0]?.bid || auction?.starting_bid,
    },
  })

  const handlePlaceBid: SubmitHandler<FormInputs> = useCallback(
    async value => {
      try {
        setLoadingPlaceBid(true)

        const res: any = await ws.request('place_bid', {
          auction_id: auction.id,
          amount: value.bid,
        })
        if (res.error) {
          throw new Error(res.error)
        }

        setLoadingPlaceBid(false)
        reset(
          {
            bid: current_bid?.bid,
          },
          { keepTouched: false, keepDirty: false },
        )
        toast.success(res.message)
      } catch (err: any) {
        toast.error(err.message)
        setLoadingPlaceBid(false)
      }
    },
    [auction.id, current_bid?.bid, reset],
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const epochData = await getHashPrice()
        setEpoch(epochData)
        setValue('bid', bids[0]?.bid + 1000 || auction?.starting_bid)
      } catch (error: any) {
        toast.error(error.message)
      }
    }

    fetchData()
  }, [auction?.starting_bid, bids, setValue])

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
                      <form className="gap-4" onSubmit={handleSubmit(handlePlaceBid)}>
                        <Input
                          id="bid"
                          defaultValue={bids[0]?.bid + 1000 || auction.starting_bid}
                          errorMessage={errors.bid?.message}
                          placeholder="Bid amount"
                          {...register('bid')}
                        />
                        <button
                          className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-gradient px-5 text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled"
                          type="submit"
                          disabled={loadingPlaceBid || !isSocketReady}
                        >
                          Place bid
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <BidWidgetCalculator auction={auction} epoch={epoch} bids={bids} />
    </>
  )
}

interface BidWidgetCalculatorProps {
  auction: Auction
  epoch: HashpriceDict
  bids: BidsEntityOrCurrentBid[]
}

function BidWidgetCalculator({ auction, epoch, bids }: BidWidgetCalculatorProps) {
  let filteredEpoch: any = {}
  if (Object.keys(epoch).length > 0) {
    filteredEpoch = Object.values(epoch).reduce((a, b) => (a > b ? a : b))
  }

  const [hashPrice, setHashPrice] = useState<number>(Math.floor(filteredEpoch.mean || 0) || 0)
  const [speed] = useState(auction.auction_meta.hashrate)
  const [duration] = useState(auction.auction_meta.days_of_mining)
  const payout = hashPrice * Number(speed) * Number(duration) - (Number(bids[0]?.bid) || Number(auction.starting_bid))

  const priceInFiat = useSatsToFiat({ initialValue: 0, bid: payout || 0 })

  useEffect(() => {
    setHashPrice(Math.floor(filteredEpoch.mean))
  }, [filteredEpoch.mean])

  const min = 1
  const max = 800

  return (
    <div className="mt-4 flex w-full flex-col items-start rounded-xl bg-white px-4 py-3 opacity-70">
      <h1 className="mb-2 text-base">Hash price</h1>
      {Object.keys(filteredEpoch).length > 0 && (
        <div className="flex items-center justify-between">
          <input
            onChange={e => {
              setHashPrice(Math.max(min, Math.min(max, Number(e.target.value))) || 0)
            }}
            type="number"
            className="w-full rounded-lg border border-gray-400 p-2 text-center text-lg disabled:bg-gradient-disabled"
            id="hashprice"
            max={800}
            placeholder="0"
            value={formatMoney(hashPrice)}
          />
          <p className="ml-1 text-right text-sm text-dark-100">Sats per TH/s/Day</p>
        </div>
      )}

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
          placeholder="hashprice"
          value={hashPrice.toString()}
        />
      </label>
      <div className="mt-14">
        <h1 className="flex items-center text-base">
          Estimated profit
          <Tooltip placement="bottom">
            <TooltipTrigger>
              <QuestionMarkCircleIcon className="ml-2 h-6 w-6" />
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
              Based on latest bid
            </TooltipContent>
          </Tooltip>{' '}
        </h1>

        <Tooltip>
          <TooltipTrigger>
            <h3 className="flex items-center" id="formula-result-#11">
              <span className={clsx('text-black', payout < 0 ? 'text-red-500' : '')}>{formatMoney(payout)}</span>{' '}
              <SatsSvg className="ml-2" />
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
