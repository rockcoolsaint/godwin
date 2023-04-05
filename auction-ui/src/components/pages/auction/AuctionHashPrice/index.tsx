import Plot from 'react-plotly.js'
import data from 'src/assets/json/auction_live_feed.json'
import { PlotDataType } from 'src/components/pages/auction/types'

export default function AuctionHashPrice() {
  const plot = data as PlotDataType

  return (
    <div className="flex h-full items-center justify-center overflow-scroll">
      <Plot data={plot.data} layout={plot.layout} />
    </div>
  )
}
