import { PlotData } from 'plotly.js'
import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { Auction } from 'src/api/auction/types'
import graphData from 'src/assets/json/auction_live_feed.json'
import { PlotDataType } from 'src/components/pages/auction/types'

export default function AuctionLiveFeed({ auction }: { auction: Auction }) {
  const plot = graphData as unknown as PlotDataType
  const plotData = plot.data[0] as PlotData
  const [hashrate, setHashrate] = useState([])

  useEffect(() => {
    const stratums_id = auction.auction_meta.proxy?.stratums_id

    if (stratums_id) {
      const getPlotData = async () => {
        const res = await fetch(`https://data.rigly.io/stratum/${stratums_id}`)
        const data = await res.json()
        setHashrate(data)
      }

      getPlotData()
    }
  }, [auction.auction_meta.proxy])

  plotData.x = hashrate.map(({ timestamp }) => timestamp)
  plotData.y = hashrate.map(({ hashrate }) => hashrate)

  return (
    <div className="flex h-full items-center justify-center overflow-scroll ">
      <Plot
        data={plot.data}
        layout={{ ...plot.layout, autosize: false, width: 800 }}
        config={{
          displayModeBar: false,
        }}
      />
    </div>
  )
}
