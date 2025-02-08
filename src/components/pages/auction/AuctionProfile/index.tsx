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
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'

interface Props {
  data: Auction
}

const AuctionProfile = ({ data }: Props) => {
  const { t } = useTranslation()
  const [hashrateData, setHashrateData] = useState<HashrateDataType | null>(null)
  const [expandedSections, setExpandedSections] = useState({
    basicInfo: true,
    hashrate: true,
    payment: false
  })

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
      return days > 0 ? `${days} ${days > 1 ? 'days' : 'day'}` : 'N/A'
    }
    return 'N/A'
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <section className="rounded-3 flow-root h-full rounded-xl border bg-gray-50 px-0 py-3 sm:px-4">
      <div className="border-1 rounded-xl bg-white p-2">
        {/* Basic Info Section */}
        <div className="border-b">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => toggleSection('basicInfo')}
          >
            <h3 className="text-lg font-bold">Basic Information</h3>
            {expandedSections.basicInfo ? 
              <ChevronUpIcon className="h-5 w-5" /> : 
              <ChevronDownIcon className="h-5 w-5" />
            }
          </div>
          {expandedSections.basicInfo && (
            <div className="px-4">
              <div className="flex items-center border-b py-3">
                <span className="w-1/2 font-semibold">Hashrate source</span>
                <span className="w-1/2"><Link href="https://rigly.io" styled>Rigly</Link></span>
              </div>
              <div className="flex items-center border-b py-3">
                <span className="w-1/2 font-semibold">Duration</span>
                <span className="w-1/2">{renderDuration()}</span>
              </div>
              <div className="flex items-center border-b py-3">
              <span className="w-1/2 font-semibold">Start Time</span>
              <span className="w-1/2">
                {data.end_at ? format(new Date(data.end_at), 'M/d/yy h:mm a') : 'N/A'}
              </span>
            </div>
            </div>
          )}
        </div>

        {/* Hashrate Section */}
        <div className="border-b">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => toggleSection('hashrate')}
          >
            <h3 className="text-lg font-bold">Hashrate Details</h3>
            {expandedSections.hashrate ? 
              <ChevronUpIcon className="h-5 w-5" /> : 
              <ChevronDownIcon className="h-5 w-5" />
            }
          </div>
          {expandedSections.hashrate && (
            <div className="px-4">
              <div className="flex items-center border-b py-3">
                <span className="w-1/2 font-semibold">Current block party hashrate</span>
                <span className="w-1/2">
                  {hashrateData ? (
                    <>
                      {formatMoney(hashrateData.base_hashrate)} TH/s
                      <span className="text-gray-600 ml-2">
                      (+{formatMoney(
                        hashrateData.bid_bonus_hashrate + 
                        hashrateData.auctioneer_match_bonus + 
                        hashrateData.extra_hashrate
                      )} TH/s bonus)
                    </span>
                    </>
                  ) : 'Loading...'}
                </span>
              </div>
              <div className="flex items-center border-b py-3">
                <span className="w-1/2 font-semibold">Lot hashrate</span>
                <span className="w-1/2">
                  {hashrateData ? (
                    <>
                      {formatMoney(data.auction_meta.hashrate)} TH/s
                      <span className="text-gray-600 ml-2">
                        ({((data.auction_meta.hashrate / hashrateData.base_hashrate) * 100).toFixed(1)}% of current party hashrate)
                      </span>
                    </>
                  ) : 'Loading...'}
                </span>
              </div>

              <div className="flex items-center border-b py-3">
              <span className="w-1/2 font-semibold">Pool url</span>
              <span className="w-1/2 break-all">
                <Link href="https://solo.ckpool.org/users/3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH" styled>
                solo.ckpool.org
                </Link>
              </span>
            </div>

              <div className="flex items-center border-b py-3">
              <span className="w-1/2 font-semibold">Mining escrow</span>
              <span className="w-1/2 break-all">
                <Link href="https://mempool.space/address/3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH" styled>
                  3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH
                </Link>
              </span>
            </div>
            </div>
          )}
        </div>

        {/* Payment Section */}
        <div className="border-b">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => toggleSection('payment')}
          >
            <h3 className="text-lg font-bold">Payment Details</h3>
            {expandedSections.payment ? 
              <ChevronUpIcon className="h-5 w-5" /> : 
              <ChevronDownIcon className="h-5 w-5" />
            }
          </div>
          {expandedSections.payment && (
            <div className="px-4">
              <div className="flex items-center border-b py-3">
                <span className="w-1/2 font-semibold">Auction fee</span>
                <span className="w-1/2">0%</span>
              </div>
              <div className="flex items-center border-b py-3">
                <span className="w-1/2 font-semibold">Payment terms</span>
                <span className="w-1/2">Bitcoin, on-chain or Lightning -- due within 1 hour of auction end</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AuctionProfile