'use client'

import { useEffect, useState } from 'react'
import { getHashrateData, HashrateData } from 'src/api/auction/getHashrateData'

import ZapOff from 'src/assets/svg/zap_off.svg'
import ChartComponent from 'src/components/pages/auction/AuctionLiveFeed/Chart'

export default function BlockPartyLiveFeed() {
  const [hashrate, setHashrate] = useState<HashrateData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    const stratums_id = Number('15459')

    if (stratums_id) {
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
  }, [])

  if (loading) {
    return (
      <div className="flex h-full animate-pulse flex-col items-center justify-center">
        <ZapOff className="ml-10 mt-10 h-24 w-24 text-dark-100" />
        <p className="ml-2 text-center text-gray-500">Loading livefeed data</p>
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
      <ChartComponent title={'Livefeed'} data={data} />
    </div>
  )
}
