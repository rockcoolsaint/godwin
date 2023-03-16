'use client'

import Image from 'next/image'
import { Auction } from 'src/api/auction/types'
import Link from 'src/components/shared/Link'

interface ProductProps {
  auction: Auction
}

const CollectionProductBlock = ({ auction }: ProductProps) => {
  return (
    <div className="mb-4 rounded-xl border border-gray-100">
      <aside className="px-5 pt-5">
        <Image
          className="mb-4 w-full rounded-xl"
          width={352}
          height={230}
          src="https://via.placeholder.com/352x230"
          alt={auction.title + ' Image'}
        />
        <h3 className="mb-3 text-center text-2xl">{auction.title}</h3>
        <p className="text-center text-sm text-dark-100">14 Days | 280TH/s | Feb 26+</p>

        <div className="mt-6 flex justify-between">
          <div className="flex flex-col items-start">
            <h5 className="mb-2 text-sm text-dark-100">Bid End Date:</h5>
            <strong className="text-left">28 Dec 2022, 12:00 am</strong>
          </div>
          <div className="flex flex-col items-end">
            <h5 className="mb-2 text-sm text-dark-100">No. of Bids:</h5>
            <strong className="text-right">{auction.bid_count}</strong>
          </div>
        </div>
      </aside>
      <aside className="mt-5 flex items-center justify-between border-t border-[#EBEFF0] p-5">
        <div>
          <h4 className="text-sm font-medium text-dark-100">Current Bid</h4>
          <h3 className="text-base">{auction.current_bid}</h3>
        </div>
        <Link href={'/product/' + auction.slug_category} className="rounded-xl bg-gradient px-8 py-3 text-white hover:bg-gradient-hover">
          <span className="text-base font-medium">Place a bid</span>
        </Link>
      </aside>
    </div>
  )
}

export default CollectionProductBlock
