'use client'

import { useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import { getBitcoinPrice, satoshisToBTC, satoshisToFiat } from 'src/utils/bitcoin'
import { formatMoney } from 'src/utils/currency'

export const MiningCalculator = () => {
  const [btcPrice, setBtcPrice] = useState<number>(0)
  const blockRewardBTC = 3.125
  
  useEffect(() => {
    const fetchBTCPrice = async () => {
      const price = await getBitcoinPrice()
      setBtcPrice(price)
    }
    
    fetchBTCPrice()
  }, [])

  const blockRewardUSD = btcPrice * blockRewardBTC
  const buyerRewardUSD = btcPrice * 0.00025000

  return (
    <div className="border rounded-lg p-6 space-y-4 bg-white">

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-900">Next block party</span>
      </div>
      <span className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">
        Saturday, April 26th 16:00-22:00 UTC
      </span>
    </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Block reward</span>
        </div>
        <div className="text-right flex items-center gap-2">
          <span className="text-gray-600">{blockRewardBTC} BTC + tx fees</span>
          <span className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">
            ${formatMoney(blockRewardUSD)}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Your potential share</span>
          <Tooltip>
            <TooltipTrigger>
              <InformationCircleIcon className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 p-3 text-sm text-white">
              Based on a 100 PH/s block party, actual share will vary
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="text-right flex items-center gap-2">
          <span className="text-gray-600">25,000 sats</span>
          <span className="text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">
            ${formatMoney(buyerRewardUSD)}
          </span>
        </div>
      </div>

      {/* New Odds Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Odds</span>
          <Tooltip>
            <TooltipTrigger>
              <InformationCircleIcon className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 p-3 text-sm text-white">
              Example odds based on 100 PH/s block party, see dashboard for current odds
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="text-gray-600">1 in 280</span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Hashrate</span>
          <Tooltip>
            <TooltipTrigger>
              <InformationCircleIcon className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="w-max rounded bg-gray-600 p-3 text-sm text-white">
              Current hashprice is 60 sats per TH/s/day
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="text-gray-600">8 TH/s</span>
      </div>

      <button className="w-full mt-6 bg-[#f08222] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#e07212] transition-colors">
        Buy - 120 sats
      </button>
    </div>
  )
}