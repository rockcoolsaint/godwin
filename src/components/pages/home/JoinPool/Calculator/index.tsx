'use client'

import { useEffect, useState } from 'react'
import { getHashRate } from 'src/api/hashprice'
import DirectSaleThreeSteps from 'src/components/pages/direct-sale/DirectSaleThreeSteps'

import InstantMining from 'src/components/pages/home/InstantMining'

export function MiningCalculator() {
  const [difficulty, setDifficulty] = useState(0)
  const [feePercentage, setFeePercentage] = useState(2)
  const [globalHashrate, setGlobalHashrate] = useState(0)
  const [hashrateRaw, setHashrateRaw] = useState(0)

  const [hashprice, setHashprice] = useState(0)
  const [baseHashprice, setBaseHashprice] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const hashrate = await getHashRate()

      setGlobalHashrate(Math.floor(hashrate.currentHashrate / 1_000_000_000_000_000_000))
      setHashrateRaw(hashrate.currentHashrate)
      setDifficulty(hashrate.currentDifficulty / 1_000_000_000_000)

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const blockReward = 6.25
    const txFee = feePercentage / 100
    const hashprice = (blockReward * 144 + blockReward * 144 * txFee) / (globalHashrate * 1_000_000_000_000)
    const baseHashprice = (blockReward * 144) / (globalHashrate * 1_000_000_000_000_000_000)
    const difficulty = (globalHashrate * 1_000_000_000_000_000_000 * 600) / 2 ** 32
    setHashprice(Math.floor(hashprice * 100_000_000_000_000))
    setBaseHashprice(Math.floor(baseHashprice * 100_000_000_000_000_000_000))
    setDifficulty(difficulty / 1_000_000_000_000)
  }, [globalHashrate, hashrateRaw, feePercentage])

  return (
    <>
      <section className="flex w-full flex-col items-center bg-gradient-to-r from-[#1A3263] to-[#5C3FAF] lg:p-20">
        <h1 className="mt-10 w-11/12 text-center font-chakra text-3xl text-white sm:w-8/12 lg:mt-0 lg:w-full lg:text-5xl 2xl:w-8/12 2xl:text-7xl">
          Buy Hashrate and Start mining now
        </h1>
        <p className="my-5 w-11/12 text-center font-epilogue text-xs text-white lg:my-10 lg:w-9/12 lg:text-xl 2xl:text-3xl">
          Jump right in and start mining to your pool account
        </p>
      </section>
      <DirectSaleThreeSteps />
      <div className="flex w-full flex-col items-center bg-gradient-to-r from-[#1A3263] to-[#5C3FAF] lg:p-20">
        <InstantMining />
      </div>
    </>
  )
}
