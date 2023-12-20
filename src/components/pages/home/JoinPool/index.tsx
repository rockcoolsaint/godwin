'use client'

import clsx from 'clsx'
import { useState } from 'react'
import Input from 'src/core/components/Input'

export default function JoinPool() {
  const [product, setProduct] = useState({
    testDrive: true,
    hashrate: false,
    bidHashrate: false,
  })

  return (
    <section className="w-full bg-gradient-to-r from-[#1A3263] to-[#5C3FAF] p-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center">
        <h1 className="font-chakra text-7xl text-white">Join a mining pool</h1>
        <p className="my-10 w-11/12 text-center font-epilogue text-4xl text-white">
          If you&apos;re new to bitcoin mining, take our test drive which includes 3 hours of sample hashrate, and a mining pool account.
        </p>

        <div className="flex w-full flex-col items-center rounded-xl bg-white p-10 py-16">
          <h2 className="bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text font-chakra text-7xl font-bold text-transparent">
            Get started
          </h2>
          <p className="my-8 w-5/12 text-center font-epilogue text-xl font-normal text-gray-500">
            You&apos;ll be setting up a demo pool account with Braiins.pool. You can change pools later.
          </p>
          <div className="mb-10 flex w-7/12 items-center justify-between">
            <p className="flex flex-col items-center justify-center text-center">
              <h5 className="text-3xl font-bold">Hashrate</h5>
              <p className="text-xl">88 TH/s</p>
            </p>
            <p className="flex flex-col items-center justify-center text-center">
              <h5 className="text-3xl font-bold">Duration</h5>
              <p className="text-xl">3 hours</p>
            </p>
            <p className="flex flex-col items-center justify-center text-center">
              <h5 className="text-3xl font-bold">Price</h5>
              <p className="text-xl">500 sats</p>
            </p>
          </div>
          <div className="flex w-8/12 items-end justify-between">
            <div className="flex w-7/12 flex-col">
              <Input
                className="text-2xl text-gray-600"
                id="email"
                type="text"
                autoComplete="off"
                autoCorrect="off"
                placeholder="satoshi@gmx.com"
                label="Enter your email to get sample hashrate"
              />
            </div>
            <button
              //   disabled={!isDirty || !isValid}
              type="submit"
              className="mt-8 flex h-12 w-4/12 items-center justify-center rounded-lg bg-hero-gradient px-5 py-2 font-chakra text-xl font-bold text-white outline-none hover:opacity-80 disabled:cursor-not-allowed disabled:bg-gradient-disabled"
            >
              Buy simple hashrate
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-7xl items-center justify-center rounded-full bg-[#EBF7FE] font-bold text-gray-500 hover:cursor-pointer">
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

// #1A3263, #5C3FAF
