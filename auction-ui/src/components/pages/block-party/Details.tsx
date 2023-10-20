import Image from 'next/image'
import chart from 'src/assets/png/chart.png'

function BlockPartyDetails() {
  return (
    <div>
      <Image className="mb-4 block w-full overflow-hidden sm:h-64" src={chart} width={352} height={230} alt="chart" />
      <h3 className="text-center">21 PH/s</h3>
    </div>
  )
}

export default BlockPartyDetails
