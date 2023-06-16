'use client'

import { useEffect, useState } from 'react'
import { getHashrateData, HashrateData } from 'src/api/auction/getHashrateData'
import { Auction } from 'src/api/auction/types'
import Chart from './Chart'

export default function AuctionLiveFeed({ auction }: { auction: Auction }) {
  const [hashrate, setHashrate] = useState<HashrateData[]>([])

  useEffect(() => {
    const stratums_id = auction.auction_meta.proxy?.stratums_id

    if (stratums_id) {
      const getPlotData = async () => {
        try {
          const hashrateData = await getHashrateData(stratums_id)
          setHashrate(hashrateData)
        } catch (ex) {
          console.error(ex)
        }
      }

      getPlotData()
    }
  }, [auction.auction_meta.proxy])

  return (
    <div className="scrollbar-hide flex h-full items-center justify-center overflow-scroll ">
      <Chart
        title={auction.auction_meta.proxy?.stratums_id || 'Hashrate data'}
        data={hashrate.map(({ hashrate, timestamp }) => ({ x: timestamp, y: hashrate }))}
      />
    </div>
  )
}
