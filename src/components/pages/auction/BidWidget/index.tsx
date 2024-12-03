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
  isNewUser?: boolean
  hasPaidOrder?: boolean
}


const BidWidget = ({ auction, current_bid, bids, winner, user_proxy_bid, isNewUser, hasPaidOrder }: Props) => {
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
                <div className="mt-5 flex w-full flex-col items-center bg-orange-100 p-4">
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
                <div className={clsx('flex w-full flex-col items-center bg-orange-100 p-4', current_bid ? 'pt-0' : 'mt-5 pt-4')}>
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

              {current_bid === null && !user_proxy_bid && auction.status === AuctionStatus.Active && (
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
  // Original hashprice calculator state
  let filteredEpoch: any = {}
  if (Object.keys(epoch).length > 0) {
    filteredEpoch = Object.values(epoch).reduce((a, b) => (a > b ? a : b))
  }

  const [hashPrice, setHashPrice] = useState<number>(Math.floor(filteredEpoch.mean || 0) || 0)
  const [speed] = useState(auction.auction_meta.hashrate)
  const [duration] = useState(auction.auction_meta.days_of_mining)
  const payout = hashPrice * Number(speed) * Number(duration)
  const priceInFiat = useSatsToFiat({ initialValue: 0, bid: payout || 0 })

  // Solo mining calculator state
  const baseHashrate = 1.0 // 1 PH/s base
  const networkHashrate = 760 // 760 EH/s
  const [boostAmount, setBoostAmount] = useState(2) // Number of 10 TH/s boosts
  const [baseOdds, setBaseOdds] = useState(0)
  const [boostedOdds, setBoostedOdds] = useState(0)

  useEffect(() => {
    setHashPrice(Math.floor(filteredEpoch.mean))
  }, [filteredEpoch.mean])

  // In the odds calculation useEffect:
  useEffect(() => {
    function calculateOdds() {
      // Calculate base odds (1 PH/s)
      const baseHashrateEH = baseHashrate / 1000 // Convert PH/s to EH/s
      const blocksPerDay = 144 // 6 blocks per hour * 24 hours
      const baseProbability = (baseHashrateEH / networkHashrate) * blocksPerDay
      const baseOneInX = Math.round(1 / baseProbability)
      setBaseOdds(baseOneInX)

      // Calculate boosted odds (base + boost)
      const boostHashrateEH = (boostAmount * 10) / 1000000 // Convert TH/s to EH/s
      const totalHashrateEH = baseHashrateEH + boostHashrateEH
      const boostedProbability = (totalHashrateEH / networkHashrate) * blocksPerDay
      const boostedOneInX = Math.round(1 / boostedProbability)
      setBoostedOdds(boostedOneInX)
    }

    calculateOdds()
  }, [boostAmount])

  return (
    <div className="relative mt-4 flex w-full flex-col items-start rounded-xl bg-white px-4 py-6 opacity-70">
      {/* Original hashprice calculator section */}
      {/* ... keep existing hashprice calculator code ... */}

      {/* New solo mining calculator section */}
      <div className="mt-6 border-t pt-6 w-full">
        <h1 className="mb-2 text-base">Party Boost</h1>
        <p className="mb-4 text-sm text-dark-100 max-w-sm">
          Block party gets bonus hashrate from Evan after each auction close.</p>
        {/* Party Boost Slider */}
        <div className="mb-6">
          <label 
            htmlFor="boostSlider" 
            className="mb-3 flex items-center text-sm font-semibold text-dark-200"
          >
            +10 TH/s (or more) after each auction
            <ExclamationCircleIcon className="ml-1 inline h-4 w-4" />
          </label>
          <input
            type="range"
            id="boostSlider"
            min="1"
            max="200"
            step="1"
            value={boostAmount}
            onChange={(e) => setBoostAmount(Number(e.target.value))}
            className={`${styles['range-slider']} w-full`}
          />
          <div className="mt-2 text-sm text-dark-100">
            Current Boost: +{(boostAmount * 10).toLocaleString()} TH/s
          </div>
        </div>

      {/* Base Odds Display */}
      <div className="mb-6">
        <h2 className="flex items-center text-base">
          Base Mining Odds (1 PH/s)
          <Tooltip placement="bottom">
            <TooltipTrigger>
              <QuestionMarkCircleIcon className="ml-2 size-6" />
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
              Base odds with 1,000 TH/s
            </TooltipContent>
          </Tooltip>
        </h2>
        <div className="mt-2 text-lg">
          1 in {formatMoney(baseOdds)}
        </div>
      </div>

      {/* Boosted Odds Display */}
      <div className="mt-4">
        <h2 className="flex items-center text-base">
          Boosted Mining Odds
          <Tooltip placement="bottom">
            <TooltipTrigger>
              <QuestionMarkCircleIcon className="ml-2 size-6" />
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
              Odds with base hashrate plus party boost
            </TooltipContent>
          </Tooltip>
        </h2>
        <div className="mt-2 text-lg">
          1 in {formatMoney(boostedOdds)}
        </div>
        <div className="mt-2 text-lg">
        <p className="mb-4 text-sm text-dark-100 max-w-sm">
          Verify odds at <Link href="https://solochance.com" styled>solochance.com</Link></p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default BidWidget
