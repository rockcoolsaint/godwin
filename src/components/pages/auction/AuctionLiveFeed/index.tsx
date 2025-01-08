'use client'

import { useEffect, useState } from 'react'
import { getHashrateData, HashrateData } from 'src/api/auction/getHashrateData'
import { Auction } from 'src/api/auction/types'
import Chart from './Chart'
import ZapOff from 'src/assets/svg/zap_off.svg'

export default function AuctionLiveFeed({ auction }: { auction: Auction }) {
  const [hashrate, setHashrate] = useState<HashrateData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const stratums_id = auction.auction_meta.livefeed_stratums_id || auction.auction_meta.proxy?.stratums_id

    if (stratums_id) {
      setLoading(true)
      const getPlotData = async () => {
        try {
          const hashrateData = await getHashrateData(stratums_id)
          setHashrate(hashrateData)
          setLoading(false)
        } catch (ex) {
          console.error(ex)
        }
      }

      getPlotData()
    }
  }, [auction.auction_meta.livefeed_stratums_id, auction.auction_meta.proxy?.stratums_id])

  if (loading) {
    return (
      <div className="flex h-full animate-pulse flex-col items-center justify-center">
        <ZapOff className="ml-10 mt-10 h-24 w-24 text-dark-100" />
        <p className="ml-2 text-center text-gray-500">Monitor: https://solo.ckpool.org/users/3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH</p>
      </div>
    )
  }

  if (hashrate.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <ZapOff className="ml-10 mt-10 h-24 w-24 text-dark-100" />
        <p className="ml-2 text-center text-gray-500">Monitor: https://solo.ckpool.org/users/3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH</p>
      </div>
    )
  }

  const data = [
    {
      x: hashrate.map(({ timestamp }) => timestamp),
      y: hashrate.map(({ hashrate }) => hashrate / 1000000000000),
      marker: {
        color: 'rgb(3, 93, 242)',
      },
    },
  ]

  return (
    <div className="scrollbar-hide h-full w-full overflow-scroll overflow-y-hidden">
      <Chart title={auction.auction_meta.livefeed_stratums_id.toString() || 'Hashrate data'} data={data} />
    </div>
  )
}
