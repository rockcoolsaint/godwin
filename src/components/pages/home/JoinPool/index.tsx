'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { Auction } from 'src/api/auction/types'
import AuctionSchedule from 'src/components/pages/home/AuctionSchedule'

import { MiningCalculator } from './Calculator'
import TestDrive from './TestDrive'

export default function JoinPool({ data }: { data: Auction[] }) {
  const [product, setProduct] = useState({
    testDrive: true,
    hashrate: false,
    bidHashrate: false,
  })

  return (
    <section className="w-full bg-gradient-to-r from-[#1A3263] to-[#5C3FAF] lg:p-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center">
        {product.testDrive && <TestDrive />}
        {product.hashrate && <MiningCalculator />}
        {product.bidHashrate && <AuctionSchedule auctionsData={data} />}
      </div>
      <div className="mx-auto my-4 flex max-w-7xl items-center justify-center rounded-full bg-[#EBF7FE] text-xs font-bold text-gray-500 hover:cursor-pointer lg:mt-20 lg:text-base">
        <p
          className={clsx(product.testDrive ? 'bg-white text-primary' : 'text-gray-500', 'flex-1 rounded-full p-2 text-center')}
          onClick={() => setProduct({ ...product, testDrive: true, bidHashrate: false, hashrate: false })}
        >
          Take a test drive
        </p>
        <p
          className={clsx(product.hashrate ? 'bg-white text-primary' : 'text-gray-500', 'flex-1 rounded-full p-2 text-center')}
          onClick={() => setProduct({ ...product, hashrate: true, testDrive: false, bidHashrate: false })}
        >
          Buy hashrate
        </p>
        <p
          className={clsx(product.bidHashrate ? 'bg-white text-primary' : 'text-gray-500', 'flex-1 rounded-full p-2 text-center')}
          onClick={() => setProduct({ ...product, bidHashrate: true, testDrive: false, hashrate: false })}
        >
          Bid on hashrate
        </p>
      </div>
    </section>
  )
}
