'use client'

import { useEffect, useState } from 'react'
import { getCKPoolHashrateData, CKPoolHashrateData } from 'src/api/ckpool/getHashrateData'
import Chart from '../auction/AuctionLiveFeed/Chart'
import ZapOff from 'src/assets/svg/zap_off.svg'

export default function CKPoolHashrateGraph() {
  const [hashrate, setHashrate] = useState<CKPoolHashrateData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const getPlotData = async () => {
      try {
        const hashrateData = await getCKPoolHashrateData()
        setHashrate(hashrateData)
        setLoading(false)
      } catch (ex) {
        console.error(ex)
        setLoading(false)
      }
    }

    getPlotData()
    const interval = setInterval(getPlotData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex h-full animate-pulse flex-col items-center justify-center">
        <ZapOff className="ml-10 mt-10 h-24 w-24 text-dark-100" />
        <p className="ml-2 text-center text-gray-500">Loading hashrate data...</p>
      </div>
    )
  }

  if (hashrate.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <ZapOff className="ml-10 mt-10 h-24 w-24 text-dark-100" />
        <p className="ml-2 text-center text-gray-500">No hashrate data available</p>
      </div>
    )
  }

  const data = [
    {
      x: hashrate.map(({ timestamp }) => timestamp),
      y: hashrate.map(({ hashrate }) => hashrate / 1000000000000), // Convert to TH/s
      type: 'scatter',
      mode: 'lines',
      name: 'Hashrate',
      marker: {
        color: 'rgb(3, 93, 242)',
      },
    },
  ]

  return (
    <div className="scrollbar-hide h-full w-full overflow-scroll overflow-y-hidden">
      <Chart title="Block Party Mining" data={data} />
    </div>
  )
}