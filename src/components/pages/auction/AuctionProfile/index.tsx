'use client'
import { useEffect, useState } from 'react'
import Image from "next/image"
import { useTranslation } from 'src/hooks'
import { Auction } from 'src/api/auction/types'
import { underscoreToSpaceAndCapitalize } from 'utils'
import { convertTime } from 'src/utils/date'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { formatMoney } from 'src/utils/currency'
import * as miner from 'src/assets/jpg/mining.jpeg'
import { getTotalHashrateData } from 'src/api/ckpool/getHashrateData'

import { HashrateDataType } from 'src/api/hashrate/types'
import Link from 'src/components/shared/Link'


interface Props {
  data: Auction
}

const AuctionProfile = ({ data }: Props) => {
  const { t } = useTranslation()
  const [hashrateData, setHashrateData] = useState<HashrateDataType | null>(null)

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

  const renderDuration = () => {
    if (data.auction_meta.duration) {
      const days = convertTime(data.auction_meta.duration).days

      return (
        <>
          {days > 0 ? (
            <p className="p-6 pl-4">
              {days} {days > 1 ? 'days' : 'day'}{' '}
            </p>
          ) : (
            <p className="p-6 pl-4">N/A there</p>
          )}
        </>
      )
    }

    return <p className="p-6 pl-4">N/A here</p>
  }

  return (
     <section className="rounded-3 flow-root h-full rounded-xl border bg-gray-50 px-0 py-3 sm:px-4">
      <div className="border-1 flex justify-between rounded-xl bg-white p-2">
        <div className="flex-1">

          {/* Type */}
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold capitalize text-dark-100">Hashrate source</p>
            </aside>
            <aside className="w-3/6">
              <p className="p-3 pl-4 sm:whitespace-nowrap">
              <Link href="https://rigly.io" styled>Rigly</Link>
              </p>
            </aside>
          </div>

          {/* Duration */}
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold capitalize text-dark-100">Duration</p>
            </aside>
            <aside>
              {renderDuration()}
            </aside>
          </div>

          {/* Start Time */}
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold capitalize text-dark-100">Start Time</p>
            </aside>
            <aside>
              <p className="p-3 py-6 pl-4">
                {data.end_at ? new Date(data.end_at).toLocaleString() : 'N/A'}
              </p>
            </aside>
          </div>

          {/* Hashrate */}
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold capitalize text-dark-100">Current block party hashrate</p>
            </aside>
            <aside>
              <p className="p-3 pl-4">
                {hashrateData ? (
                  <>
                    {formatMoney(hashrateData.base_hashrate)} TH/s
                    <span className="text-gray-600 ml-2">
                      (+{formatMoney(hashrateData.bonus_hashrate)} TH/s bonus)
                    </span>
                  </>
                ) : (
                  'Loading...'
                )}
              </p>
            </aside>
          </div>

          {/* Lot hashrate */}
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold text-dark-100">Lot hashrate</p>
            </aside>
            <aside>
              <p className="p-3 py-6 pl-4">
                {hashrateData ? (
                  <>
                    {formatMoney(data.auction_meta.hashrate)} TH/s
                    <span className="text-gray-600 ml-2">
                      ({((data.auction_meta.hashrate / hashrateData.base_hashrate) * 100).toFixed(1)}% of current party hashrate)
                    </span>
                  </>
                ) : (
                  'Loading...'
                )}
              </p>
            </aside>
          </div>

          {/* Mining Escrow */}
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold text-dark-100">Mining escrow</p>
            </aside>
            <aside className="w-4/6">
              <p className="p-3 py-6 pl-4">
                <Link href="https://mempool.space/address/3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH"
                  styled>
                  3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH
                </Link>
              </p>
            </aside>
          </div>

          {/* Fee */}
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold text-dark-100">Auction fee</p>
            </aside>
            <aside>
              <p className="p-3 py-6 pl-4">0%</p>
            </aside>
          </div>

          {/* Payment Terms */}
          <div className="flex items-center border-b-2 border-white odd:bg-gray-300 even:bg-gray-50">
            <aside className="w-3/6 border-r-2 border-white sm:w-1/6 md:w-1/3 lg:w-2/6">
              <p className="p-3 py-6 font-semibold text-dark-100">Payment</p>
            </aside>
            <aside className="w-4/6">
              <p className="p-3 py-6 pl-4">Bitcoin, on-chain or Lightning -- due within 1 hour of auction end</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuctionProfile




