import Image from 'next/image'
import hashPrice from 'src/assets/png/hash_price.png'

export default function AuctionHashPrice() {
  return (
    <div className="h-full">
      <Image className="h-full w-full" alt="Auction live feed" src={hashPrice} width={500} height={500} />
    </div>
  )
}
