import { PlotData } from 'plotly.js'
import Plot from 'react-plotly.js'
import graphData from 'src/assets/json/auction_live_feed.json'
import { PlotDataType } from 'src/components/pages/auction/types'

export default function AuctionLiveFeed({ data }: { data: { x: string[]; y: number[] } }) {
  const plot = graphData as unknown as PlotDataType
  const plotData = plot.data[0] as PlotData
  plotData.x = data.x
  plotData.y = data.y

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
