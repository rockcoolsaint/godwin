'use client'

import { useEffect, useState } from 'react'
import { getDifficultyAdjustment, getBlockTipHeight, getHashRate, getHashPrice, HashpriceDict } from 'src/api/hashprice'
import { formatDistance, fromUnixTime } from 'date-fns'
import Link from 'src/components/shared/Link'
import HashPriceLoader from './Loader'
import { getTotalHashrateData } from 'src/api/ckpool/getHashrateData'
import { HashrateDataType } from 'src/api/hashrate/types'
import { formatMoney } from 'src/utils/currency'
import { getBitcoinPrice } from 'src/utils/bitcoin'

// Replace the EpochTable component with BlockPartyExplanation
function BlockPartyExplanation() {
  return (
    <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900">How Block Party Works</h3>
        <p className="mt-4 text-sm text-gray-500">
          You buy hashrate at auction, which is added to the block party's hashrate and sent to <Link href="https://solo.ckpool.org/" styled>CK Pool</Link> to solo mine.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          The mining's payout address is set to our multisig escrow address.</p>
        <p className="mt-4 text-sm text-gray-500">
          If we find a block, payment will be split up by hashrate contribution and sent to your payout address in your account profile.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          You are in the party for the duration of your auction's mining term - eg. 1 day, 3 days, etc.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Monitor the block party on the <Link href="/pages/dashboard" styled>Live View</Link>.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          The more people who join the party, the more hashrate we have, which improves our chances.
        </p>
        <br/>
        <h3 className="text-lg font-semibold text-gray-900">Bonus Hashrate</h3>
        <p className="mt-4 text-sm text-gray-500">
          Each auction earns 100% bonus hashrate, so more bidders means better odds for our party!
        </p>
      </div>
    </div>
  )
}

export default function HashPriceStats() {
  const [difficultyPeriod, setDifficultyPeriod] = useState(0)
  const [difficultyEstimate, setDifficultyEstimate] = useState(0)
  const [hashrate, setHashrate] = useState(0)
  const [epoch, setEpoch] = useState<HashpriceDict>({})
  const [timeToNextDifficulty, setTimeToNextDifficulty] = useState('')
  const [loading, setLoading] = useState(false)
  const [btcPrice, setBtcPrice] = useState(0)
  const [hashrateData, setHashrateData] = useState<HashrateDataType | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const difficultyEstimate = await getDifficultyAdjustment()
        const hashrate = await getHashRate()
        const blockHeight = await getBlockTipHeight()
        const epochData = await getHashPrice()

        const difficultyPeriod = blockHeight / 2016

        setHashrate(hashrate.currentHashrate / 1_000_000_000_000_000_000)
        setDifficultyEstimate(difficultyEstimate.difficultyChange)
        setDifficultyPeriod(difficultyPeriod)
        setEpoch(epochData)

        const parseDate = fromUnixTime(difficultyEstimate.estimatedRetargetDate / 1000)
        const distanceFromNow = formatDistance(parseDate, new Date())

        setTimeToNextDifficulty(distanceFromNow)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
  const fetchBTCPrice = async () => {
    const price = await getBitcoinPrice()
    setBtcPrice(price)
  }

    fetchBTCPrice();
  }, []);

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  }

  const blockRewardInUSD = btcPrice * 3.125;
  const perLotInUSD = btcPrice * 0.0625;

  return (
    <>
      {loading ? (
        <HashPriceLoader />
      ) : (
        <div className="h-full w-11/12 py-3">
          <dl className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-4 md:divide-x md:divide-y-0">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">Potential block reward</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-orange-500">3.125 BTC + Fees</div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">In USD:</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-black-500">
                  ~{btcPrice ? formatUSD(blockRewardInUSD) : 'Loading...'}
                </div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">Network hashrate</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-orange-500">
                {Math.floor(hashrate)} EH/s
                </div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">Block party hashrate</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-black-500">
                {hashrateData ? (
                  <>
                    {formatMoney(hashrateData.current_hashrate)} TH/s
                  </>
                ) : (
                  'Loading...'
                )}
                </div>
              </dd>
            </div>
          </dl>
          <BlockPartyExplanation />
        </div>
      )}
    </>
  )
}