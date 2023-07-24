import Chart from 'src/components/pages/auction/AuctionLiveFeed/Chart'

import sampleFigure from 'src/assets/json/sample_figure.json'

export function OrderHashrate() {
  return (
    <div>
      <h3 className="mb-1 font-normal">Hashrate</h3>
      <Chart title="Hashrate data" data={sampleFigure.data} />
    </div>
  )
}
