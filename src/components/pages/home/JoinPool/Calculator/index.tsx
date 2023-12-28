'use client'

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { getHashRate } from 'src/api/hashprice'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import InstantHashrate from 'src/components/pages/home/InstantHashrate'

export function MiningCalculator() {
  const [difficulty, setDifficulty] = useState(0)
  const [feePercentage, setFeePercentage] = useState(2)
  const [globalHashrate, setGlobalHashrate] = useState(0)
  const [hashrateRaw, setHashrateRaw] = useState(0)

  const [hashprice, setHashprice] = useState(0)
  const [baseHashprice, setBaseHashprice] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
      <h1 className="mt-10 w-8/12 text-center font-chakra text-4xl text-white lg:w-full lg:text-7xl">Buy mining hashrate</h1>
      <p className="my-5 w-11/12 text-center font-epilogue text-xs text-white lg:my-10 lg:text-4xl">
        Jump right in and start mining to your pool account. If you don&apos;t already have one, we&apos;ve got you covered.
      </p>
      <div className="flex w-full flex-col rounded-lg border border-white lg:flex-row">
        <InstantHashrate />
        <div className="relative order-1 flex w-full flex-col items-center justify-between rounded-lg bg-white p-6 lg:w-8/12 lg:p-12">
          <div className="w-full font-epilogue">
            <h2 className="text-base font-bold text-navy lg:text-2xl">Estimate daily mining earning</h2>
            <p className="text-xs text-gray-500 lg:text-sm">
              Use this calculator to help estimate your potential daily profit before you buy hashrate.
            </p>
            <aside className="my-2 flex items-center justify-between lg:my-10">
              <div className="inline-block w-11/12 items-start sm:w-6/12 lg:flex">
                <span className="text-xs font-bold text-navy lg:text-sm">Global Network hashrate</span>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
                  </TooltipTrigger>

                  <TooltipContent className="w-3/4 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white lg:w-2/12">
                    Sum of all hashrate from all miners on the bitcoin network. Value is an estimate based on current difficulty and block
                    speed. This calculator assumes blocks on a 10 minute interval
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="block w-4/12 text-right text-xs text-navy lg:w-2/12 lg:text-sm">{globalHashrate} EH/s</span>
            </aside>
            <aside className="my-2 flex items-center justify-between lg:mt-10">
              <div className="inline-block w-7/12 items-start sm:flex">
                <span className="text-xs font-bold text-navy lg:text-sm">Hashprice estimate</span>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
                  </TooltipTrigger>

                  <TooltipContent className="w-3/4 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white lg:w-1/6">
                    This how much bitcoin can be earned per TH/s per day, based on a &ldquo;full pay-per-share&ldquo; (FPPS) mining pool
                    payout
                  </TooltipContent>
                </Tooltip>
              </div>
            </aside>
            <aside className="mb-4 ml-4 flex items-center justify-between">
              <div className="inline-block w-6/12 items-start sm:w-5/12 lg:flex">
                <span className="text-xs font-bold text-navy lg:text-sm">Base hashprice</span>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
                  </TooltipTrigger>

                  <TooltipContent className="w-fit rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
                    Block subsidy only
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="block w-7/12 text-right text-xs text-navy lg:w-2/12 lg:text-sm">{baseHashprice} sats/TH/s/day</span>
            </aside>

            <aside className="mb-4 mt-2 flex items-center justify-between lg:mt-10">
              <div className="flex w-4/12 items-start">
                <p className="text-xs font-bold text-navy lg:text-sm">
                  Total <span className="font-normal">(plus tax)</span>
                </p>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
                  </TooltipTrigger>

                  <TooltipContent className="w-3/4 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white lg:w-fit">
                    Total hashprice (with tx fees, based on {feePercentage}% fee percentage)
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="w-4/12 text-right text-xs text-navy lg:text-sm">{Math.floor(hashprice)} sats/TH/s/day</p>
            </aside>
          </div>
          <p className="mb-4 mt-2 text-center text-sm font-bold text-navy lg:mt-8">Global network hashrate</p>
          <label htmlFor="hashrate" className="flex items-center">
            <p className="mr-4 text-sm">100 EH/s</p>
            <input
              onChange={e => {
                setGlobalHashrate(parseInt(e.target.value))
              }}
              type="range"
              className="bg-[#5C3FAF] text-[#5C3FAF]"
              id="hashrate"
              min={100}
              max={1000}
              name="volume"
              placeholder="global hashrate"
              value={Math.floor(globalHashrate)}
            />
            <p className="ml-4 text-sm">1000 EH/s</p>
          </label>
        </div>
      </div>
    </>
  )
}
