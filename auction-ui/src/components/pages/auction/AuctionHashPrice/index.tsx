import Image from 'next/image'
import hashPrice from 'src/assets/png/hash_price.png'

export default function AuctionHashPrice() {
  return (
    <div className="flex h-full items-center justify-center">
      <Image className="w-3/4 object-cover" alt="Auction hash price" src={hashPrice} width={500} height={500} />
    </div>
  )
}
