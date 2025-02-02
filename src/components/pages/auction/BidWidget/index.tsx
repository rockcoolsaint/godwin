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

        {/* Bonus Hashrate section with adjusted margins */}
        <div className="w-full rounded-lg bg-yellow-50 border border-yellow-200 p-4 mt-2 mb-6"> {/* Changed mt-4 to mt-2 and added mb-6 */}
          <div className="text-base text-gray-600">
            This auction earns{' '}
            <span className="font-bold text-orange-500">
              {auction.auction_meta.hashrate} TH/s
            </span>{' '}
            in{' '}
            <span className="font-bold text-orange-500">
              bonus hashrate
            </span>{' '}
            for the block party.
          </div>
        </div>

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
  // Combined state declarations
  const [hashrateData, setHashrateData] = useState<TotalHashrateData | null>(null)
  const [directReferrals, setDirectReferrals] = useState(0)
  const [indirectReferrals, setIndirectReferrals] = useState(0)
  const [baseOdds, setBaseOdds] = useState(0)
  const [boostedOdds, setBoostedOdds] = useState(0)
  const [withPurchasesOdds, setWithPurchasesOdds] = useState(0)

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

  // Calculate hashrate from referral purchases
  const calculateReferralPurchaseHashrate = () => {
    // Direct referrals hashrate
    const directHashrate = directReferrals * auction.auction_meta.hashrate
    // Indirect referrals (exponential) - each direct referral refers indirectReferrals people
    const indirectHashrate = (directReferrals * indirectReferrals) * auction.auction_meta.hashrate
    return directHashrate + indirectHashrate
  }

  const calculateBonusHashrate = () => {
    // Direct referrals bonus hashrate
    const directBonus = directReferrals * auction.auction_meta.hashrate
    // Indirect referrals bonus (exponential)
    const indirectBonus = (directReferrals * indirectReferrals) * auction.auction_meta.hashrate
    return directBonus + indirectBonus
  }

  useEffect(() => {
    if (!hashrateData?.base_hashrate) return
  
    function calculateOdds() {
      const networkHashrate = 760 // 760 EH/s
      const blocksPerDay = 144 // 6 blocks per hour * 24 hours
  
      // Base hashrate
      const baseHashrateEH = hashrateData.current_hashrate / 1000000
      const baseProbability = (baseHashrateEH / networkHashrate) * blocksPerDay
      const baseOneInX = Math.round(1 / baseProbability)
      setBaseOdds(baseOneInX)
  
      // Hashrate with referral purchases
      const referralPurchaseHashrateEH = calculateReferralPurchaseHashrate() / 1000000
      const withPurchasesHashrateEH = baseHashrateEH + referralPurchaseHashrateEH
      const withPurchasesProbability = (withPurchasesHashrateEH / networkHashrate) * blocksPerDay
      const withPurchasesOneInX = Math.round(1 / withPurchasesProbability)
      setWithPurchasesOdds(withPurchasesOneInX)
  
      // Boosted hashrate (including bonus hashrate)
      const bonusHashrateEH = calculateBonusHashrate() / 1000000
      const totalHashrateEH = withPurchasesHashrateEH + bonusHashrateEH
      const boostedProbability = (totalHashrateEH / networkHashrate) * blocksPerDay
      const boostedOneInX = Math.round(1 / boostedProbability)
      setBoostedOdds(boostedOneInX)
    }
  
    calculateOdds()
  }, [hashrateData, directReferrals, indirectReferrals, auction.auction_meta.hashrate])

  return (
    <div className="relative mt-4 flex w-full flex-col items-start rounded-xl bg-white px-4 py-6 opacity-70">
      {/* Referral Bonus section */}
      <div className="mt-0 w-full">
        <h1 className="mb-2 text-base">Referral Bonus</h1>
        <p className="mb-4 text-sm text-dark-100 max-w-sm">
          Improve our odds of mining a block. Each auction earns <b> 
          <Link href="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3YzbnpmOHQ4OWlwOHg5OGJ2MXE2ZnB2MTc5MHVwZzRjZzF5Y2w4aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/trN9ht5RlE3Dcwavg2/giphy.gif" styled>50-50 bonus hashrate</Link></b>
        </p>

{/* Referral Sliders Container */}
<div className="flex gap-4 mb-6">
  {/* Direct Referrals Slider */}
  <div className="flex-1">
    <label 
      htmlFor="directReferralsSlider" 
      className="mb-3 block text-sm font-semibold text-dark-200"
    >
      Users you refer
    </label>
    <div className={styles['slider-container']}>
      <input
        type="range"
        id="directReferralsSlider"
        min="0"
        max="21"
        step="1"
        value={directReferrals}
        onChange={(e) => setDirectReferrals(Number(e.target.value))}
        className={`${styles['range-slider']} w-full`}
      />
      <div className={styles['range-labels']}>
        <span>0</span>
        <span>21</span>
      </div>
    </div>
    <div className="mt-2 text-sm text-dark-100">
      <Tooltip placement="bottom">
        <TooltipTrigger>
          {directReferrals} users → {directReferrals * auction.auction_meta.hashrate} TH/s
        </TooltipTrigger>
        <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
          {directReferrals} users you directly refer<br/>will each contribute {auction.auction_meta.hashrate} TH/s
        </TooltipContent>
      </Tooltip>
    </div>
  </div>

  {/* Indirect Referrals Slider */}
  <div className="flex-1">
    <label 
      htmlFor="indirectReferralsSlider" 
      className="mb-3 block text-sm font-semibold text-dark-200"
    >
      Users they each refer
    </label>
    <div className={styles['slider-container']}>
      <input
        type="range"
        id="indirectReferralsSlider"
        min="0"
        max="21"
        step="1"
        value={indirectReferrals}
        onChange={(e) => setIndirectReferrals(Number(e.target.value))}
        className={`${styles['range-slider']} w-full`}
      />
      <div className={styles['range-labels']}>
        <span>0</span>
        <span>21</span>
      </div>
    </div>
    <div className="mt-2 text-sm text-dark-100">
      <Tooltip placement="bottom">
        <TooltipTrigger>
          {directReferrals * indirectReferrals} users → {directReferrals * indirectReferrals * auction.auction_meta.hashrate} TH/s
        </TooltipTrigger>
        <TooltipContent className="w-max rounded bg-gray-600 px-2 py-1 text-base font-medium text-white">
          Each of your {directReferrals} direct referrals<br/>brings in {indirectReferrals} users, 
          totaling {directReferrals * indirectReferrals} indirect referrals
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
</div>

{/* Mining Odds Table */}
<div className="mt-6">
  
  <div className="overflow-hidden rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Type
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Daily Odds
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Hashrate
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      {/* Base Odds Row */}
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">Current block party</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            1 in {formatMoney(baseOdds)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {hashrateData?.current_hashrate?.toFixed(2) || '0'} TH/s
          </div>
        </td>
      </tr>

      {/* What they buy Row */}
      <tr className="bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">Plus referrals</div>
          <div className="text-sm text-gray-500">Each buys {auction.auction_meta.hashrate} TH/s</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            1 in {formatMoney(withPurchasesOdds)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {((hashrateData?.current_hashrate || 0) + calculateReferralPurchaseHashrate()).toFixed(2)} TH/s
          </div>
        </td>
      </tr>

      {/* Boosted Odds Row */}
      <tr className="bg-orange-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-orange-900">Plus bonus</div>
          <div className="text-sm text-orange-700">With bonus hashrate</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-orange-900">
            1 in {formatMoney(boostedOdds)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-orange-900">
            {((hashrateData?.current_hashrate || 0) + calculateReferralPurchaseHashrate() + calculateBonusHashrate()).toFixed(2)} TH/s
          </div>
        </td>
      </tr>
      </tbody>
    </table>
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
