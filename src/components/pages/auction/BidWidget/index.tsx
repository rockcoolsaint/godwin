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
    if (!hashrateData?.base_hashrate) return { percentage: 0, btcReward: 0 }
    
    let percentage = (auction.auction_meta.hashrate / hashrateData.base_hashrate) * 100
    percentage = Math.min(percentage, 100)
    const btcReward = (percentage / 100) * BLOCK_REWARD
    return { percentage, btcReward }
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
            Block reward is 3.125 BTC. Your share will vary with the size of the party.
          </TooltipContent>
        </Tooltip>
      </h2>
      {hashrateData ? (
        <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-left">
                <MiningSvg className="h-6 w-6 flex-shrink-0" />
                <div className="text-3xl font-bold text-green-600">
                  ${formatMoney(blockRewardFiat)}
                </div>
              </div>
        
              <div className="text-base text-gray-600 text-left">
                This auction's share: <span className="font-semibold text-green-600">${formatMoney(auctionRewardFiat)}</span>
              </div>
        </div>
      ) : (
        <p className="text-sm text-dark-100">Loading hashrate data...</p>
      )}
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

              {!isLoading && !token && <p className="mt-8 text-red-500"><Link href="/login" styled>Login</Link> to place a bid</p>}

              {!isLoading && token && (
  <>
    <div className="mt-5 w-full">
      <Tab.Group>
        <Tab.List className="flex items-center rounded-xl bg-gray-300 p-1">
          {[{ label: 'Bid' }, { label: 'Proxy' }, { label: 'Name' }].map((tab, i) => (
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
      <ReferralSection />
    </>
  )
}

interface BidWidgetCalculatorProps {
  auction: Auction
  epoch: HashpriceDict
}

function BidWidgetCalculator({ auction, epoch }: BidWidgetCalculatorProps) {
  const [referredUsers, setReferredUsers] = useState(0)
  const [hashrateData, setHashrateData] = useState<TotalHashrateData | null>(null)
  const HASHRATE_PER_USER = 105 // 5 auctions × 21 TH/s each = 105 TH/s

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

  const calculateBonusHashrate = () => {
    return referredUsers * HASHRATE_PER_USER
  }

  const calculateOddsImprovement = () => {
    if (!hashrateData?.current_hashrate) return 0
    const bonusHashrate = calculateBonusHashrate()
    const currentHashrate = hashrateData.current_hashrate
    return (bonusHashrate / currentHashrate) * 100
  }

  return (
  <div className="relative mt-4 flex w-full max-w-sm flex-col items-center rounded-xl bg-white px-4 py-6"> {/* Add max-w-md and items-center */}
  <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-gray-900">Bonus hashrate</h1>
          <div className="relative group">
            <QuestionMarkCircleIcon 
              className="h-5 w-5 text-gray-400 cursor-help" 
            />
            <div className="hidden group-hover:block absolute right-0 w-64 p-2 bg-gray-800 text-white text-sm rounded-md z-10">
              Bonus hashrate based on each new bidder buying 5 auctions
            </div>
          </div>
        </div>

        <p className="mt-2 mb-6 text-sm text-gray-600">
          Refer new bidders to improve our odds of mining a block.
        </p>

        <div className="mb-6 flex flex-col items-center"> {/* Add flex and items-center */}
        <label className="text-sm text-gray-600 mb-2"> {/* Add mb-2 */}
          Number of referred users: {referredUsers}
        </label>
        <div className={styles['slider-container']}>
          <input
            type="range"
            min="0"
            max="21"
            value={referredUsers}
            onChange={(e) => setReferredUsers(parseInt(e.target.value))}
            className={styles['range-slider']}
          />
          <div className={styles['range-labels']}>
            <span>0</span>
            <span>21</span>
          </div>
        </div>
      </div>

        {/* New minimal grid-style table */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Headers */}
            <div className="text-xs font-medium text-gray-500 uppercase">Current Block Party</div>
            <div className="text-xs font-medium text-gray-500 uppercase">Bonus Hashrate</div>
            <div className="text-xs font-medium text-gray-500 uppercase">Odds Improvement</div>
            
            {/* Values */}
            <div className="text-sm font-medium text-gray-900">
              {formatMoney(hashrateData?.current_hashrate || 0)} TH/s
            </div>
            <div className="text-sm font-medium text-gray-900">
              {formatMoney(calculateBonusHashrate())} TH/s
            </div>
            <div className="text-sm font-medium text-blue-500">
              +{calculateOddsImprovement().toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



const ReferralSection = () => {
  const { account, token } = useAccountContext()
  const [copied, setCopied] = useState(false)
  
  if (!token || !account) {
    return null
  }
  
  const encodedReferralCode = encodeURIComponent(account.referral_code)
  const signupUrl = `https://upendo.rigly.io/register?referral=${encodedReferralCode}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(signupUrl)
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  return (
    <div className="mt-4 w-full rounded-xl bg-white px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Who can you refer today?</h2>
      
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-sm text-gray-600 mr-2">Share your refer code:</span>
              <span className="font-mono font-bold">{account.referral_code}</span>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 text-orange-600 hover:text-orange-700"
          >
            {copied ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <ClipboardIcon className="h-5 w-5" />
            )}
            <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BidWidget
