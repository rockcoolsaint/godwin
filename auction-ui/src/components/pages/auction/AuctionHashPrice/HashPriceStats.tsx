'use client'

import { useEffect, useState } from 'react'
import { getDifficultyAdjustment, getBlockTipHeight, getHashRate, getHashPrice, HashpriceDict } from 'src/api/hashprice'
import { formatDistance, fromUnixTime } from 'date-fns'
import HashPriceLoader from './Loader'

export default function HashPriceStats() {
  const [difficultyPeriod, setDifficultyPeriod] = useState(0)
  const [difficultyEstimate, setDifficultyEstimate] = useState(0)
  const [hashrate, setHashrate] = useState(0)
  const [epoch, setEpoch] = useState<HashpriceDict>({})
  const [timeToNextDifficulty, setTimeToNextDifficulty] = useState('')
  const [loading, setLoading] = useState(false)

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
        console.log(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {loading ? (
        <HashPriceLoader />
      ) : (
        <div className="py-3">
          <dl className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-4 md:divide-x md:divide-y-0">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">Difficulty period</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-indigo-600">{Math.floor(difficultyPeriod)}</div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">Network hashrate</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-indigo-600">{Math.floor(hashrate)} EH/s</div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">Difficulty adjustment</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-indigo-600">
                  {parseFloat(difficultyEstimate.toFixed(2))}%
                </div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">Next Difficulty (Time to)</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-lg font-semibold text-indigo-600">{timeToNextDifficulty}</div>
              </dd>
            </div>
          </dl>
          <EpochTable epoch={epoch} />
        </div>
      )}
    </>
  )
}

export function EpochTable({ epoch }: { epoch: HashpriceDict }) {
  if (Object.keys(epoch).length === 0) return null

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Epoch
                </th>
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Hashprice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {Object.entries(epoch)
                .reverse()
                .map(([epoch, data]) => (
                  <tr key={epoch} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-900 ">{epoch}</td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{Math.floor(data!.mean)} sats per TH/s/day</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
