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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                <div className="flex items-baseline text-lg font-semibold text-black-500">~$302,547</div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">Per auction lot</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-orange-500">
                0.01565 BTC
                </div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">In USD:</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-black-500">~$1,532</div>
              </dd>
            </div>
          </dl>
          <BlockPartyExplanation />
        </div>
      )}
    </>
  )
}

