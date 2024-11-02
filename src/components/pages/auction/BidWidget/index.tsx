'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { format, parseISO } from 'date-fns'
import clsx from 'clsx'
import { Tab } from '@headlessui/react'
import Countdown from 'react-countdown'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

import SatsSvg from 'src/assets/svg/sats.svg'
import { AuctionStatus, Auction, BidsEntityOrCurrentBid, Winner, ProxyBid as ProxyBidType } from 'src/api/auction/types'
import { useAccountContext } from 'src/providers/AccountProvider'
import { formatMoney } from 'src/utils/currency'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { useSatsToFiat } from 'src/hooks'
import { CountdownWidget } from 'src/components/pages/auction/BidWidget/countdownWidget'
import styles from './index.module.css'
import { getHashPrice, HashpriceDict } from 'src/api/hashprice'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import RegularBid from './RegularBid'
import ProxyBid from './ProxyBid'
import { calculateAuctionHashPrice } from 'utils'
import MiningSvg from 'src/assets/svg/mine.svg'
import Link from 'src/components/shared/Link'

interface Props {
  auction: Auction
  bids: BidsEntityOrCurrentBid[]
  current_bid: BidsEntityOrCurrentBid
  user_proxy_bid?: ProxyBidType
  winner: Winner
  slug?: string
}

const BidWidget = ({ auction, current_bid, bids, winner, user_proxy_bid }: Props) => {
  const { isLoading, token } = useAccountContext()
  const [epoch, setEpoch] = useState<HashpriceDict>({})

  const priceInFiat = useSatsToFiat({ initialValue: 0, bid: current_bid || 0 })
  const proxyFiat = useSatsToFiat({ initialValue: 0, bid: user_proxy_bid ? user_proxy_bid.maximum_amount : 0 })

  const auctionStatus = () => {
    if (auction.status === AuctionStatus.Scheduled) {
      return 'Start date:'
    }
    if (auction.status === AuctionStatus.Active) {
      return (
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          End date
        </span>
      )
    }
    if (auction.status === AuctionStatus.Completed) {
      return 'Auction ended:'
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const epochData = await getHashPrice()
        setEpoch(epochData)
      } catch (error: any) {
        toast.error(error.message)
      }
    }

    fetchData()
  }, [])

  const hasWinner = Object.keys(winner).length > 0

  const renderCalculator = () => {
    if (auction.status !== AuctionStatus.Completed) {
      return <BidWidgetCalculator auction={auction} epoch={epoch} />
    }

    if (auction.status === AuctionStatus.Completed && hasWinner) {
      return (
        <div className="mt-4 flex w-full flex-col items-start rounded-xl bg-white px-4 py-3 opacity-70">
          <Tooltip placement="top">
            <TooltipTrigger>
              <p className="flex items-center text-sm font-semibold">
                <span className="mr-2">🎉</span> Winning bid - {formatMoney(auction.current_bid)} <SatsSvg className="ml-2" />
              </p>
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
              ${formatMoney(priceInFiat)}
            </TooltipContent>
          </Tooltip>
          <p className="mt-2 flex items-center text-sm font-semibold">
            <MiningSvg className="mr-2 h-5" /> Hash price -{' '}
            {formatMoney(
              calculateAuctionHashPrice(auction.current_bid, auction.auction_meta.hashrate, auction.auction_meta.days_of_mining),
            )}
            <SatsSvg className="ml-2" />
            /TH/s/day
          </p>
        </div>
      )
    }
  }

  const hasProxyBid = user_proxy_bid && user_proxy_bid.maximum_amount

  return (
    <>
      <div className="flex w-full flex-col items-center rounded-xl bg-white p-4">
        <p className="mb-4 flex items-center text-sm text-dark-100">
          {auctionStatus()}
          <span className="ml-1 text-sm font-normal text-dark-100">- {format(parseISO(auction.end_at), 'MMMM dd, yy - h:mm aa')}</span>
          <ExclamationCircleIcon className="ml-1 size-4" />
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
                <div className="mt-5 flex w-full flex-col items-center bg-gray-200 p-4">
                  <h5>Current bid</h5>
                  <Tooltip placement="left">
                    <TooltipTrigger>
                      <h1 className="flex items-center justify-center">
                        {formatMoney(current_bid.bid)} <SatsSvg className="ml-2" />
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
                      ${formatMoney(priceInFiat)}
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
              {hasProxyBid && (
                <div className={clsx('flex w-full flex-col items-center bg-gray-200 p-4', current_bid ? 'pt-0' : 'mt-5 pt-4')}>
                  <h6 className="w-4/12 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-gray-500/30">
                    Proxy bid
                  </h6>
                  <Tooltip placement="left">
                    <TooltipTrigger>
                      <h5 className="flex items-center justify-center rounded-md px-2 py-1 text-sm font-semibold text-gray-600 ">
                        {formatMoney(user_proxy_bid.maximum_amount)} <SatsSvg className="ml-2" />
                      </h5>
                    </TooltipTrigger>
                    <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
                      ${formatMoney(proxyFiat)}
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              {current_bid === null && !user_proxy_bid && (
                <div className="mt-7 w-full rounded-xl bg-gray-200 p-4">
                  <span>Be the first to place a bid</span>
                </div>
              )}

              {!isLoading && !token && <p className="mt-8 text-red-500">You need to be logged in to place a bid</p>}

              {!isLoading && token && (
                <>
                  <div className="mt-5 w-full">
                    <Tab.Group>
                      <Tab.List className="flex items-center rounded-xl bg-gray-300 p-1">
                        {[{ label: 'Bid' }, { label: 'Proxy' }].map((tab, i) => (
                          <Tab key={i} className="h-8 w-full rounded-lg px-4 outline-none ui-selected:bg-gray-500">
                            <span className="ui-selected:text-white">{tab.label}</span>
                          </Tab>
                        ))}
                      </Tab.List>

                      <Tab.Panels>
                        <Tab.Panel className="pt-4">
                          <RegularBid auction={auction} bids={bids} current_bid={current_bid} />
                        </Tab.Panel>
                        <Tab.Panel className="pt-4">
                          <ProxyBid
                            auction={auction}
                            bids={bids}
                            current_bid={current_bid}
                            proxy_bid_max={(user_proxy_bid && user_proxy_bid.maximum_amount) || 0}
                          />
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {renderCalculator()}
    </>
  )
}

interface BidWidgetCalculatorProps {
  auction: Auction
  epoch: HashpriceDict
}

function BidWidgetCalculator({ auction, epoch }: BidWidgetCalculatorProps) {
  let filteredEpoch: any = {}
  if (Object.keys(epoch).length > 0) {
    filteredEpoch = Object.values(epoch).reduce((a, b) => (a > b ? a : b))
  }

  const [hashPrice, setHashPrice] = useState<number>(Math.floor(filteredEpoch.mean || 0) || 0)
  const [speed] = useState(auction.auction_meta.hashrate)
  const [duration] = useState(auction.auction_meta.days_of_mining)
  const payout = hashPrice * Number(speed) * Number(duration)

  const priceInFiat = useSatsToFiat({ initialValue: 0, bid: payout || 0 })

  useEffect(() => {
    setHashPrice(Math.floor(filteredEpoch.mean))
  }, [filteredEpoch.mean])

  const min = 1
  const max = 800

  return (
    <div className="relative mt-4 flex w-full flex-col items-start rounded-xl bg-white px-4 py-6 opacity-70">
      <h1 className="mb-2 text-base">Hash price</h1>
      {Object.keys(filteredEpoch).length > 0 && (
        <div data-test-id="step-hashprice" className="flex items-center justify-between">
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

      <label data-test-id="step-range" htmlFor="#hashprice" className="mt-4 flex w-full max-w-[336px] items-center">
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
      <div data-test-id="step-estimate" className="my-10">
        <h1 className="flex items-center text-base">
          Estimated revenue
          <Tooltip placement="bottom">
            <TooltipTrigger>
              <QuestionMarkCircleIcon className="ml-2 size-6" />
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
              Default hashprice is based on current network difficulty and fee volume.
            </TooltipContent>
          </Tooltip>{' '}
        </h1>

        <Tooltip>
          <TooltipTrigger>
            <h3 className="flex items-center" id="formula-result-#11">
              <span className={clsx('text-black', payout < 0 ? 'text-red-500' : '')}>{Boolean(payout) ? formatMoney(payout) : 0}</span>{' '}
              <SatsSvg className="ml-2" />
            </h3>
          </TooltipTrigger>
          <TooltipContent className="w-max max-w-fit rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
            ${formatMoney(priceInFiat)}
          </TooltipContent>
        </Tooltip>
      </div>
      <span className="absolute bottom-2 text-xs text-navy">
        Adjust hashprice to estimate potential mining revenue. Data source: {' '}
        <Link
          target="_blank"
          href="https://data.hashrateindex.com/network-data/btc"
          className=" font-semibold text-black underline hover:no-underline"
        >
          Hashrate Index
        </Link>{' '}
       </span>
    </div>
  )
}

export default BidWidget
