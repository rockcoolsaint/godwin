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
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'

import { updateAccount } from 'src/api/auth/updateAccount'
import { Input } from 'src/core'
import { getTotalHashrateData, type TotalHashrateData } from 'src/api/ckpool/getHashrateData'
import useSoloMineCalculator from 'src/hooks/useSoloMineCalculator'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const PROJECTED_BLOCK_PARTY_SPEED = 4096;

const isCurrentlyMining = (hashrateData?: TotalHashrateData | null) => {
  return hashrateData?.current_hashrate > 0;
};

// Format duration helper function
const formatDuration = (days) => {
  const hours = days * 24
  if (hours < 48) {
    return `${hours} hours`
  }
  return `${days} days`
}

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

const PotentialMiningReward = ({ auction, hashrateData }) => {
  const BLOCK_REWARD = 3.125 // BTC
  const blockRewardInSats = BLOCK_REWARD * 100000000

  const blockRewardFiat = useSatsToFiat({
    initialValue: 0,
    bid: blockRewardInSats
  })

  const calculateRewards = () => {
    if (!auction?.auction_meta?.hashrate) return { percentage: 0, btcReward: 0 }
    
    const currentlyMining = isCurrentlyMining(hashrateData);
    const effectiveHashrate = currentlyMining 
      ? hashrateData?.current_hashrate 
      : PROJECTED_BLOCK_PARTY_SPEED;

    let percentage = (auction.auction_meta.hashrate / effectiveHashrate) * 100;
    percentage = Math.min(percentage, 100);
    const btcReward = (percentage / 100) * BLOCK_REWARD;
    
    return { percentage, btcReward, useActual: currentlyMining };
  }

  const rewards = calculateRewards()
  const auctionRewardFiat = useSatsToFiat({ 
    initialValue: 0, 
    bid: rewards.btcReward * 100000000 
  })

  return (
    <div className="mb-4 w-full rounded-xl bg-yellow-50 border border-yellow-200 p-4">
      <h2 className="flex items-center text-base font-bold mb-2">
        Potential Mining Reward
        <Tooltip placement="bottom">
          <TooltipTrigger>
            <QuestionMarkCircleIcon className="ml-2 size-6" />
          </TooltipTrigger>
          <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
            Block reward is 3.125 BTC. {rewards.useActual 
              ? 'Your share is based on current block party speed.'
              : 'Your share is based on projected block party speed.'
            }
          </TooltipContent>
        </Tooltip>
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-left">
          <div className="text-3xl font-bold text-green-600">
            ${formatMoney(blockRewardFiat)}
          </div>
        </div>
        <div className="text-base text-gray-600 text-left">
          Your potential share: <span className="font-semibold text-green-600">
            ${formatMoney(auctionRewardFiat)}
          </span>
        </div>
      </div>
    </div>
  )
}

const BidWidget = ({ auction, current_bid, bids, winner, user_proxy_bid, isNewUser, hasPaidOrder }: Props) => {
  const [epoch, setEpoch] = useState<HashpriceDict>({})
  const { isLoading, token, account } = useAccountContext() // Get account context first

  const priceInFiat = useSatsToFiat({ initialValue: 0, bid: current_bid || 0 })
  const proxyFiat = useSatsToFiat({ initialValue: 0, bid: user_proxy_bid ? user_proxy_bid.maximum_amount : 0 })
  const [hashrateData, setHashrateData] = useState<TotalHashrateData | null>(null)

  const [loading, setLoading] = useState(false)
  const [newUsername, setNewUsername] = useState(account?.username || '')

  const BonusHashrateBox = ({ current_bid, auction }) => {
    const bonusHashrate = calculateAuctionBonusHashrate(current_bid?.bid || 0, auction)
    const baseValue = calculateBaseValue(auction)
    const currentBidAmount = current_bid?.bid || 0
    
    const totalBonusHashrate = bonusHashrate * 1.21
    
    return (
      <div className="mb-4 w-full max-w-sm rounded-xl bg-orange-50 border border-orange-200 p-4">
        <h2 className="flex items-center text-base font-bold mb-2">
          Bonus Hashrate
          <Tooltip placement="bottom">
            <TooltipTrigger>
              <QuestionMarkCircleIcon className="ml-2 size-6" />
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
              Block party earns {formatDuration(auction.auction_meta.days_of_mining)} extra hashrate<br/>
              from overbidding, 21% match by auctioneer (Evan)
            </TooltipContent>
          </Tooltip>
        </h2>
  
        {bonusHashrate > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-left">
            <div className="flex gap-1">
      <MiningSvg className="h-5" /><MiningSvg className="h-5" />
    </div>
              <div className="text-3xl font-bold text-orange-600">
                {totalBonusHashrate.toFixed(0)} TH/s
              </div>
            </div>
  
            <div className="text-sm text-gray-600 text-left">
              Bidder <span className="font-semibold text-orange-600">{bonusHashrate.toFixed(0)} TH/s</span>
            </div>
            <div className="text-sm text-gray-600 text-left">
              Auctioneer <span className="font-semibold text-orange-600">{(bonusHashrate * 0.21).toFixed(0)} TH/s</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-left">
              <div className="text-lg text-gray-700">
                Bid over <span className="font-bold text-orange-600">{formatMoney(baseValue)} sats</span> to earn<br/>bonus hashrate
              </div>
            </div>
            {currentBidAmount > 0 && currentBidAmount < baseValue && (
              <div className="mt-1 text-sm text-orange-600">
                You need {formatMoney(baseValue - currentBidAmount)} more sats to start earning bonus hashrate
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Add the handleSubmit function
  const handleSubmit = async () => {
    if (!token || newUsername === account?.username) return
    
    try {
      setLoading(true)
      const updateSuccess = await updateAccount({ username: newUsername }, token)
      if (updateSuccess) {
        toast.success('Username updated successfully')
      }
    } catch (ex: any) {
      toast.error(ex.message)
    } finally {
      setLoading(false)
    }
  }

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

  // Add useEffect to fetch hashrate data
  useEffect(() => {
    async function fetchHashrateData() {
      try {
        const data = await getTotalHashrateData()
        setHashrateData(data)
      } catch (error) {
        console.error('Failed to fetch hashrate data:', error)
      }
    }

    fetchHashrateData()
    const interval = setInterval(fetchHashrateData, 60000)
    return () => clearInterval(interval)
  }, [])

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

    // Add these constants at the top level, before the BidWidget component
    const SPOT_HASHPRICE = 64 // Current spot hashprice in sats/TH/s/day

    const calculateBaseValue = (auction) => {
      return auction.auction_meta.hashrate * 
            auction.auction_meta.days_of_mining * 
            SPOT_HASHPRICE
    }
  
    const calculateAuctionBonusHashrate = (bid: number, auction: Auction) => {
      if (!auction?.auction_meta?.hashrate || !auction?.auction_meta?.days_of_mining) {
        console.warn('Missing required auction properties for bonus calculation')
        return 0
      }
      const baseValue = calculateBaseValue(auction)
      if (bid > baseValue) {
        const excessAmount = bid - baseValue
        // Convert days_of_mining to a fraction of a day to adjust SPOT_HASHPRICE
        const dailyFraction = 1 / auction.auction_meta.days_of_mining
        // Divide SPOT_HASHPRICE by the daily fraction to get correct bonus hashrate
        return excessAmount / (SPOT_HASHPRICE / dailyFraction)
      }
      return 0
    }
  
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
      <div className="flex w-full flex-col items-center rounded-xl bg-white p-4 max-w-md">
        {/* Add PotentialMiningReward at the top */}
        <PotentialMiningReward 
          auction={auction}
          hashrateData={hashrateData}
          className="overflow-x-hidden"
        />
        {/* Update the BonusHashrateBox call with correct props */}
        <BonusHashrateBox 
          current_bid={current_bid}
          auction={auction}
        />
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
            <div className="flex items-center">
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

              {!isLoading && !token && <p className="mt-8 text-red-500"><Link href="/login" styled>Login</Link> to place a bid</p>}

              {!isLoading && token && (
  <>
    <div className="mt-5 w-full">
      <Tab.Group>
        <Tab.List className="flex items-center rounded-xl bg-gray-300 p-1">
          {[{ label: 'Bid' }, { label: 'Proxy' }, { label: 'Goal' }].map((tab, i) => (
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
          <Tab.Panel className="pt-4">
            <div className="flex w-full items-center gap-2">
              <span className="text-sm text-gray-600">Mining for:</span>
              <Input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Anonymous"
                className="flex-1"
                disabled={loading}
              />
              <button
                onClick={handleSubmit}
                disabled={loading || newUsername === account?.username}
                className={`ml-2 rounded-md px-3 py-2 text-sm font-semibold text-white ${
                  loading || newUsername === account?.username
                    ? 'bg-orange-400'
                    : 'bg-orange-500 hover:bg-orange-500'
                }`}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
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
  const [activeTab, setActiveTab] = useState('auction')
  const [referredUsers, setReferredUsers] = useState(0)
  const [currentBid, setCurrentBid] = useState(0)
  const [hashrateData, setHashrateData] = useState<TotalHashrateData | null>(null)
  const [auctioneerBonus, setAuctioneerBonus] = useState(1000)
  const [isExpanded, setIsExpanded] = useState(false)

  const HASHRATE_PER_USER = 105 // 5 auctions × 21 TH/s each = 105 TH/s
  const SPOT_HASHPRICE = 64 // Current spot hashprice in sats/TH/s/day
  const AUCTIONEER_MATCH_PERCENTAGE = 0.21; // 21% match

  // Set initial bid to current auction bid or base value
  useEffect(() => {
    if (auction.current_bid) {
      setCurrentBid(auction.current_bid)
    } else {
      setCurrentBid(calculateBaseValue())
    }
  }, [auction])

  // Fetch hashrate data
  useEffect(() => {
    async function fetchHashrateData() {
      try {
        const data = await getTotalHashrateData()
        setHashrateData(data)
      } catch (error) {
        console.error('Failed to fetch hashrate data:', error)
      }
    }

    fetchHashrateData()
    const interval = setInterval(fetchHashrateData, 60000)
    return () => clearInterval(interval)
  }, [])

  const calculateBaseValue = () => {
    return auction.auction_meta.hashrate * 
           auction.auction_meta.days_of_mining * 
           SPOT_HASHPRICE
  }

  const calculateReferralBonusHashrate = () => {
    return referredUsers * HASHRATE_PER_USER
  }

  const calculateOddsImprovement = () => {
    if (!hashrateData?.current_hashrate) return 0
    const bonusHashrate = calculateReferralBonusHashrate()
    const currentHashrate = hashrateData.current_hashrate
    return (bonusHashrate / currentHashrate) * 100
  }

  const calculateAuctionBonusHashrate = (bid: number) => {
    const baseValue = calculateBaseValue()
    if (bid > baseValue) {
      const excessAmount = bid - baseValue
      // Convert days_of_mining to a fraction of a day to adjust SPOT_HASHPRICE
      const dailyFraction = 1 / auction.auction_meta.days_of_mining
      // Divide SPOT_HASHPRICE by the daily fraction to get correct bonus hashrate
      return excessAmount / (SPOT_HASHPRICE / dailyFraction)
    }
    return 0
  }

  const calculateAuctioneerOddsImprovement = () => {
    if (!hashrateData?.current_hashrate) return 0
    return (auctioneerBonus / hashrateData.current_hashrate) * 100
  }

  // Use the hook with the current hashrate
  const miningCalc = useSoloMineCalculator({ 
    customHashrate: hashrateData?.current_hashrate || 0 
  })

  const formatDailyOdds = (chancePerBlockDay: number) => {
    const dailyPercentage = (1 / chancePerBlockDay) * 100
    
    if (dailyPercentage < 0.01) {
      return `${dailyPercentage.toFixed(4)}%`
    } else if (dailyPercentage < 0.1) {
      return `${dailyPercentage.toFixed(3)}%`
    } else if (dailyPercentage < 1) {
      return `${dailyPercentage.toFixed(2)}%`
    } else {
      return `${dailyPercentage.toFixed(1)}%`
    }
  }

  return (
    <div className="relative mt-4 flex w-full max-w-sm flex-col items-center rounded-xl bg-white px-4 py-6">
      <div className="w-full">
        {/* Tab Navigation */}
        <div className="mb-6 flex border-b">
          <button
            className={`mr-4 pb-2 ${
              activeTab === 'auction' ? 'border-b-2 border-orange-500 font-bold' : ''
            }`}
            onClick={() => setActiveTab('auction')}
          >
            Auction
          </button>
          <button
            className={`mr-4 pb-2 ${
              activeTab === 'refer' ? 'border-b-2 border-orange-500 font-bold' : ''
            }`}
            onClick={() => setActiveTab('refer')}
          >
            Block Party
          </button>
        </div>

        {activeTab === 'refer' && (
        <>
          {hashrateData?.current_hashrate > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium text-gray-900">Block Party Stats</h1>
                <div className="relative group">
                  <QuestionMarkCircleIcon 
                    className="h-5 w-5 text-gray-400 cursor-help" 
                  />
                  <div className="hidden group-hover:block absolute right-0 w-64 p-2 bg-gray-800 text-white text-sm rounded-md z-10">
                    Current mining power and odds of finding a block
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {/* Current Stats */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Network Hashrate</span>
                      <span className="font-medium">
                        {miningCalc.isLoading ? 'Loading...' : `${formatMoney(miningCalc.globalHashrate || 0)} TH/s`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current Hashrate</span>
                      <span className="font-medium">
                        {miningCalc.isLoading ? 'Loading...' : `${formatMoney(hashrateData?.current_hashrate || 0)} TH/s`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Daily Block Chance</span>
                      <span className="font-medium">
                        {miningCalc.isLoading ? 'Loading...' : `1 in ${Math.round(miningCalc.chancePerBlockDay).toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Projected Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">At 2× Hashrate</span>
                    <span className="font-medium text-orange-600">
                      {miningCalc.isLoading ? 'Loading...' : `1 in ${Math.round(miningCalc.chancePerBlockDay / 2).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">At 3× Hashrate</span>
                    <span className="font-medium text-orange-600">
                      {miningCalc.isLoading ? 'Loading...' : `1 in ${Math.round(miningCalc.chancePerBlockDay / 3).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">At 4× Hashrate</span>
                    <span className="font-medium text-orange-600">
                      {miningCalc.isLoading ? 'Loading...' : `1 in ${Math.round(miningCalc.chancePerBlockDay / 4).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 text-center mt-4">
                    Don't trust, verify at{' '}
                    <a 
                      href="https://solochance.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-600"
                    >
                      Solochance
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Show dashboard link when not mining
            <div className="flex flex-col items-center justify-center py-8">
              <h1 className="text-lg font-medium text-gray-900 mb-4">Block Party Stats</h1>
              <p className="text-gray-600 mb-4 text-center">
                Block party is not currently mining.<br/>
                Check the dashboard for updates.
              </p>
              <Link 
                href="/pages/dashboard" 
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-700"
              >
                View Dashboard →
              </Link>
            </div>
          )}
        </>
      )}

{activeTab === 'auction' && (
  <>
    <div className="mb-6">
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Spot hashprice</span>
          <div className="font-medium">
            {SPOT_HASHPRICE} <span className="text-xs text-gray-500">sats/TH/s/day</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600">Base cost</span>
          <div className="font-medium">
            {formatMoney(calculateBaseValue(auction))} <span className="text-xs text-gray-500">sats</span>
          </div>
        </div>
      </div>
    </div>

    {/* Collapsible Bid Bonus Section */}
    <div className="mb-6">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
      >
        <div className="flex items-center">
          <h1 className="text-lg font-medium text-gray-900">Bid Bonus Calculator</h1>
          <div className="relative group ml-2">
            <QuestionMarkCircleIcon 
              className="h-5 w-5 text-gray-500 cursor-help" 
            />
            <div className="hidden group-hover:block absolute right-0 w-64 p-2 bg-gray-800 text-white text-sm rounded-md z-10">
              Bid high to earn extra hashrate for the block party
            </div>
          </div>
        </div>
        <ChevronDownIcon 
          className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-base font-medium text-gray-900">
              Adjust your bid
            </label>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-orange-500">
                {formatMoney(currentBid)}
              </span>
              <span className="ml-1 text-xs text-gray-500">sats</span>
            </div>
          </div>

          <div className={styles['slider-container']}>
            <input
              type="range"
              min={calculateBaseValue(auction)}
              max={calculateBaseValue(auction) * 10}
              value={currentBid}
              onChange={(e) => setCurrentBid(parseInt(e.target.value))}
              className={styles['range-slider']}
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatMoney(calculateBaseValue(auction))} sats</span>
              <span>{formatMoney(calculateBaseValue(auction) * 10)} sats</span>
            </div>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Overbid hashrate</span>
                <span className="text-m font-bold text-orange-500">
                  {formatMoney(calculateAuctionBonusHashrate(currentBid))} TH/s
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Auctioneer match (21%)</span>
                <span className="text-m font-bold text-orange-500">
                  {formatMoney(calculateAuctionBonusHashrate(currentBid) * AUCTIONEER_MATCH_PERCENTAGE)} TH/s
                </span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">TOTAL</span>
                  <span className="text-2xl font-bold text-orange-500">
                    {formatMoney(calculateAuctionBonusHashrate(currentBid) * (1 + AUCTIONEER_MATCH_PERCENTAGE))} TH/s
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-sm text-gray-600">
                Bonus hashrate is for {formatDuration(auction.auction_meta.days_of_mining)} 
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
)}

      </div>
    </div>
  )
}


export default BidWidget
