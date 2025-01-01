'use client'

import { useEffect, useState } from 'react'
import { getDifficultyAdjustment, getBlockTipHeight, getHashRate, getHashPrice, HashpriceDict } from 'src/api/hashprice'
import { formatDistance, fromUnixTime } from 'date-fns'
import HashPriceLoader from './Loader'

// Replace the EpochTable component with BlockPartyExplanation
function BlockPartyExplanation() {
  return (
    <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900">How Block Party Works</h3>
        <p className="mt-4 text-sm text-gray-500">
          On the start date and time, hashrate is purchased via Rigly and sent to CK Pool to solo mine.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          The mining's payout address is set to a multisig escrow address with Rigly and Evan.</p>
        <p className="mt-4 text-sm text-gray-500">
          If we find a block, payment will be split up by hashrate contribution and sent to the payout address in your account profile.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          You get an email once the block party mining begins.
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
                <div className="flex items-baseline text-lg font-semibold text-black-500">~$290,800</div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">Per auction lot</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-orange-500">
                0.06250 BTC
                </div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">In USD:</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-black-500">~$6,920</div>
              </dd>
            </div>
          </dl>
          <BlockPartyExplanation />
        </div>
      )}
    </>
  )
}

