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
      <h1 className="font-chakra text-7xl text-white">Buy mining hashrate</h1>
      <p className="my-10 w-11/12 text-center font-epilogue text-4xl text-white">
        Jump right in and start mining to your pool account. If you don&apos;t already have one, we&apos;ve got you covered.
      </p>
      <div className="flex w-full rounded-lg border border-white">
        <InstantHashrate />
        <div className="relative flex w-8/12 flex-col items-center justify-between rounded-lg bg-white p-12">
          <div className="w-full font-epilogue">
            <h2 className="text-2xl font-bold text-navy">Estimate daily mining earning</h2>
            <p className="text-sm text-gray-500">
              Use this calculator to help estimate your potential daily profit before you buy hashrate.
            </p>
            <aside className="my-10 flex items-center justify-between">
              <div className="inline-block w-10/12 items-start sm:w-6/12 lg:flex">
                <span className="text-sm font-bold text-navy">Global Network hashrate</span>
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
              <span className="block w-2/12 text-right text-sm text-navy">{globalHashrate} EH/s</span>
            </aside>
            {/* <aside className="mb-4 flex items-center justify-between">
              <div className="inline-block w-7/12 items-start sm:w-6/12 lg:flex">
                <span className="text-sm font-bold text-navy">Difficulty estimate</span>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
                  </TooltipTrigger>

                  <TooltipContent className="w-3/4 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white lg:w-1/6">
                    Determines how hard it is to hash out a winning block
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="w-3/12 text-right text-sm text-navy">
                {Number(difficulty).toPrecision(4)}T <sup>Hashes/Block</sup>
              </span>
            </aside> */}
            <aside className="mb-4 mt-10 flex items-center justify-between">
              <div className="inline-block w-7/12 items-start sm:flex">
                <span className="text-sm font-bold text-navy">Hashprice estimate</span>
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
                <span className="text-sm text-navy">Base hashprice</span>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
                  </TooltipTrigger>

                  <TooltipContent className="w-fit rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
                    Block subsidy only
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="w-4/12 text-right text-sm text-navy">{baseHashprice} sats/TH/s/day</span>
            </aside>
            {/* <aside className="mb-4 ml-4 flex items-center justify-between">
              <div className="flex w-6/12 items-center">
                <span className="text-xs">Tx fee percentage</span>
              </div>
              <span className="mr-2 w-4/12 text-xs font-semibold">{feePercentage}%</span>
            </aside> */}
            <aside className="mb-4 mt-10 flex items-center justify-between">
              <div className="flex w-4/12 items-start">
                <p className="text-sm font-bold text-navy">
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
              <p className="w-4/12 text-right text-sm text-navy">{Math.floor(hashprice)} sats/TH/s/day</p>
            </aside>
          </div>
          <p className="mb-4 mt-8 text-center text-sm font-bold text-navy">Global network hashrate</p>
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

          {/* <p className="mb-2 mt-4 flex items-center text-center text-sm">
            <span>Adjust Tx fee percentage</span>
            <Tooltip placement="top">
              <TooltipTrigger>
                <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
              </TooltipTrigger>

              <TooltipContent className="w-1/6 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
                Bitcoin transaction fees as a share of the block reward
              </TooltipContent>
            </Tooltip>
          </p>
          <label htmlFor="fee_percentage" className="flex items-center">
            <p className="mr-4 text-sm">1%</p>
            <input
              onChange={e => {
                setFeePercentage(parseInt(e.target.value))
              }}
              type="range"
              min={1}
              id="fee_percentage"
              max={20}
              name="fee_percentage"
              value={feePercentage}
            />
            <p className="ml-4 text-sm">20%</p>
          </label>
          <a
            href="#auction-market"
            className="mt-4 block w-6/12 rounded-lg bg-gradient p-4 px-5 text-center text-base capitalize text-white hover:bg-gradient-hover sm:mt-8 sm:w-4/12"
          >
            Place bid
          </a> */}
        </div>
      </div>
    </>
  )
}
