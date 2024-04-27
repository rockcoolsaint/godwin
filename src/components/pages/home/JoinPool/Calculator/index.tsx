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
      <div className="flex w-full flex-col items-center lg:p-20">
        <InstantMining />
      </div>
    </>
  )
}
