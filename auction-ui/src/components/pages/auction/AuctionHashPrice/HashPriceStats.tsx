'use client'

import { useEffect, useState } from 'react'
import { getDifficultyAdjustment, getBlockTipHeight, getHashRate } from 'src/api/hashprice'
import { formatMoney } from 'src/utils/currency'

export default function HashPriceStats() {
  const [blockHeight, setBlockHeight] = useState(0)
  const [difficultyPeriod, setDifficultyPeriod] = useState(0)
  const [difficultyEstimate, setDifficultyEstimate] = useState(0)
  const [hashrate, setHashrate] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const difficultyEstimate = await getDifficultyAdjustment()
      const hashrate = await getHashRate()

      const blockHeight = await getBlockTipHeight()
      const difficultyPeriod = blockHeight / 2016
      setHashrate(hashrate.current_hashrate)
      setDifficultyEstimate(difficultyEstimate.difficultyChange)
      setBlockHeight(blockHeight)
      setDifficultyPeriod(difficultyPeriod)
    }

    fetchData()
  }, [])

  return (
    <div className="py-3">
      <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-4 md:divide-x md:divide-y-0">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-normal text-gray-900">Block height</dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-lg font-semibold text-indigo-600">{formatMoney(blockHeight + 1)}</div>
          </dd>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-normal text-gray-900">Difficulty period</dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-lg font-semibold text-indigo-600">{Math.floor(difficultyPeriod)}</div>
          </dd>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-normal text-gray-900">Difficulty adjustment</dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-lg font-semibold text-indigo-600">{parseFloat(difficultyEstimate.toFixed(2))}</div>
          </dd>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-normal text-gray-900">Network hashrate</dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-lg font-semibold text-indigo-600">{Math.floor(hashrate)} EH/s</div>
          </dd>
        </div>
      </dl>
      <EpochTable />
    </div>
  )
}

const epoch = [
  { epoch: 'Epoch 384', hashprice: 324 },
  { epoch: 'Epoch 385', hashprice: 329 },
  { epoch: 'Epoch 386', hashprice: 297 },
  { epoch: 'Epoch 387', hashprice: 301 },
  { epoch: 'Epoch 388', hashprice: 276 },
  { epoch: 'Epoch 389', hashprice: 283 },
  { epoch: 'Epoch 390', hashprice: 264 },
]

export function EpochTable() {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 ">
                  Epoch
                </th>
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Hashprice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {epoch.map((data, index) => (
                <tr key={index} className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 ">{data.epoch}</td>
                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">{data.hashprice} sats per TH/s/day</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
