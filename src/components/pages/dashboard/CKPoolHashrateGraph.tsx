'use client'

import { useEffect, useState } from 'react'
import { getCKPoolHashrateData, CKPoolHashrateData } from 'src/api/ckpool/getHashrateData'
import Chart from '../auction/AuctionLiveFeed/Chart'
import ZapOff from 'src/assets/svg/zap_off.svg'

export default function CKPoolHashrateGraph() {
  const [hashrate, setHashrate] = useState<CKPoolHashrateData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const layout = {
    title: {
      text: 'Block Party Mining - in TH/s',
      font: {
        size: 24,
        color: '#000000'
      },
      y: 0.95, // Adjust title position from top
      x: 0.5,  // Center the title
      xanchor: 'center',
      yanchor: 'top'
    },
    showlegend: true,
    legend: {
      x: 0.95,
      y: 0.05,
      xanchor: 'right'
    },
    margin: {
      t: 60, // Add top margin to accommodate title
      l: 75,
      r: 75,
      b: 50
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    height: 400  // Explicitly set height
  }

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
      <Chart 
        title="Block Party Mining - in TH/s" 
        data={data} 
        layout={layout}
      />
    </div>
  )
}