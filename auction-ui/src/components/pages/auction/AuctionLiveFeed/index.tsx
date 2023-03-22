import Image from 'next/image'
import livefeed from 'src/assets/png/live_feed.png'

export default function AuctionLiveFeed() {
  return (
    <div className="h-full">
      <Image className="h-full w-full" alt="Auction live feed" src={livefeed} width={500} height={500} />
    </div>
  )
}
