'use client'

import { QuestionMarkCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { getHashRate } from 'src/api/hashprice'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
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
      <h1 className="mt-10 w-8/12 text-center font-chakra text-4xl text-white lg:mt-0 lg:w-full lg:text-5xl 2xl:w-8/12 2xl:text-7xl">
        Buy Hashrate and Start mining now
      </h1>
      <p className="my-5 w-11/12 text-center font-epilogue text-xs text-white lg:my-10 lg:w-9/12 lg:text-xl 2xl:text-3xl">
        Jump right in and start mining to your pool account. If you don&apos;t already have one, we&apos;ve got you covered.
      </p>
      <div className="flex w-full flex-col rounded-lg border border-white lg:flex-row 2xl:w-10/12">
        <InstantMining />
        <div className="relative order-1 flex w-full flex-col items-center justify-between rounded-lg bg-white p-6 lg:w-10/12 lg:p-12 2xl:w-8/12">
          <div className="w-full font-epilogue">
            <h2 className="mb-2 text-base font-bold text-navy lg:text-lg 2xl:text-2xl">Estimate daily mining earning</h2>
            <p className="text-xs text-gray-500 xl:text-sm 2xl:w-10/12">
              Use this calculator to help estimate your potential daily revenue before you buy hashrate.
            </p>
            <aside className="my-2 flex items-center justify-between lg:my-10">
              <div className="inline-block w-11/12 items-start sm:w-6/12 lg:flex">
                <span className="text-xs font-bold text-navy xl:text-sm">Global Network hashrate</span>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon className="ml-1 h-3 w-3 xl:h-4 xl:w-4" />
                  </TooltipTrigger>

                  <TooltipContent className="w-3/4 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white lg:w-2/12">
                    Sum of all hashrate from all miners on the bitcoin network. Value is an estimate based on current difficulty and block
                    speed. This calculator assumes blocks on a 10 minute interval
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="block w-4/12 text-right text-xs text-navy lg:w-2/12 xl:text-sm">{globalHashrate} EH/s</span>
            </aside>
            <aside className="my-2 flex items-center justify-between lg:mt-10">
              <div className="inline-block w-7/12 items-start sm:flex">
                <span className="text-xs font-bold text-navy xl:text-sm">Hashprice estimate</span>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon className="ml-1 h-3 w-3 xl:h-4 xl:w-4" />
                  </TooltipTrigger>

                  <TooltipContent className="w-3/4 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white lg:w-1/6">
                    This how much bitcoin can be earned per TH/s per day, based on a &ldquo;full pay-per-share&ldquo; (FPPS) mining pool
                    payout
                  </TooltipContent>
                </Tooltip>
              </div>
            </aside>
            <aside className="mb-4 flex items-center justify-between">
              <div className="inline-block w-6/12 items-start sm:w-5/12 lg:flex">
                <span className="text-xs font-normal text-navy xl:text-sm">Base hashprice</span>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon className="ml-1 h-3 w-3 xl:h-4 xl:w-4" />
                  </TooltipTrigger>

                  <TooltipContent className="w-fit rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
                    Block subsidy only
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="block w-7/12 text-right text-xs text-navy lg:w-5/12 xl:text-sm 2xl:w-3/12">
                {baseHashprice} sats/TH/s/day
              </span>
            </aside>

            <aside className="mb-4 mt-2 flex items-center justify-between lg:mt-10">
              <div className="flex w-4/12 items-start">
                <p className="text-xs font-bold text-navy xl:text-sm">
                  Total <span className="font-normal">(plus tax)</span>
                </p>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon className="ml-1 h-3 w-3 xl:h-4 xl:w-4" />
                  </TooltipTrigger>

                  <TooltipContent className="w-3/4 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white lg:w-fit">
                    Total hashprice (with tx fees, based on {feePercentage}% fee percentage)
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="w-4/12 text-right text-xs text-navy lg:w-5/12 xl:text-sm">{Math.floor(hashprice)} sats/TH/s/day</p>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
