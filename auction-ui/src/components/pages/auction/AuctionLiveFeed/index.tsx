import Image from 'next/image'
import livefeed from 'src/assets/png/live_feed.png'

export default function AuctionLiveFeed() {
  return (
    <div className="flex h-full items-center justify-center">
      <Image className="w-3/4 object-cover" alt="Auction live feed" src={livefeed} width={500} height={500} />
    </div>
  )
}
