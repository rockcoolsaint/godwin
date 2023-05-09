import { PlotData } from 'plotly.js'
import Plot from 'react-plotly.js'
import { Hashrate } from 'src/api/auction/getAuctionBySlug'
import graphData from 'src/assets/json/auction_live_feed.json'
import { PlotDataType } from 'src/components/pages/auction/types'

export default function AuctionLiveFeed({ hashrate }: { hashrate: Hashrate[] }) {
  const plot = graphData as unknown as PlotDataType
  const plotData = plot.data[0] as PlotData

  const oneDayAgo = new Date()
  oneDayAgo.setDate(oneDayAgo.getDate() - 1)

  const sanitizedHashrate = hashrate
    .filter(({ timestamp, hashrate }) => {
      return hashrate.calculated !== -1 && new Date(timestamp) >= oneDayAgo
    })
    .map(({ timestamp, hashrate }) => {
      return {
        timestamp: new Date(timestamp),
        hashrate: hashrate.calculated,
      }
    })

  plotData.x = sanitizedHashrate.map(({ timestamp }) => timestamp)
  plotData.y = sanitizedHashrate.map(({ hashrate }) => hashrate)

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
