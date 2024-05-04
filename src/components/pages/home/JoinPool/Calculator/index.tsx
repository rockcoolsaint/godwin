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
      <div className="my-10 flex w-full flex-col items-center md:px-20">
        <h2 className="bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text font-chakra text-2xl font-bold text-transparent lg:text-4xl 2xl:text-7xl">
          Get started
        </h2>
        <p className="my-4 w-full text-center font-epilogue text-xs font-normal text-gray-500 lg:my-8 lg:w-3/5 lg:text-xl 2xl:w-7/12 2xl:text-3xl">
          Buy hashrate now
        </p>
        <InstantMining />
      </div>
    </>
  )
}
