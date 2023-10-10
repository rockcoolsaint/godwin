'use client'

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { getHashRate } from 'src/api/hashprice'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'

export function HomepageCalculator() {
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
    const baseHashprice = (blockReward * 144) / hashrateRaw
    const difficulty = (globalHashrate * 1_000_000_000_000_000_000 * 600) / 2 ** 32
    setHashprice(Math.floor(hashprice * 100_000_000_000_000))
    setBaseHashprice(Math.floor(baseHashprice * 100_000_000_000_000_000_000))
    setDifficulty(difficulty / 1_000_000_000_000)
  }, [globalHashrate, hashrateRaw, feePercentage])

  if (loading) {
    return (
      <div className="min-h-96 mx-auto h-96 rounded-md border-2 border-dark-100 p-8 shadow sm:w-8/12">
        <div className="flex animate-pulse flex-col ">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-slate-300"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-slate-300"></div>
                <div className="col-span-1 h-2 rounded bg-slate-300"></div>
              </div>
              <div className="h-2 rounded bg-slate-300"></div>
            </div>
          </div>
          <div className="mt-8 flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-slate-300"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-slate-300"></div>
                <div className="col-span-1 h-2 rounded bg-slate-300"></div>
              </div>
              <div className="h-2 rounded bg-slate-300"></div>
            </div>
          </div>
          <div className="mt-8 flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-slate-300"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-slate-300"></div>
                <div className="col-span-1 h-2 rounded bg-slate-300"></div>
              </div>
              <div className="h-2 rounded bg-slate-300"></div>
            </div>
          </div>
          <div className="mt-8 w-11/12 flex-1 items-center justify-center">
            <div className="mx-auto w-6/12">
              <div className="h-8 w-full rounded bg-slate-300"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="relative flex justify-center sm:w-11/12">
      <div className="relative flex w-full flex-col items-center justify-between rounded-md border-2 border-dark-100 bg-white p-4 shadow-2xl sm:w-9/12 sm:pl-10 sm:pr-0">
        <div className="w-full">
          <aside className="my-4 mt-0 flex items-center justify-between">
            <div className="flex w-6/12 items-start">
              <span className="text-sm">Global Network hashrate</span>
              <Tooltip placement="top">
                <TooltipTrigger>
                  <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
                </TooltipTrigger>

                <TooltipContent className="w-2/12 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
                  Sum of all hashrate from all miners on the bitcoin network. Value is an estimate based on current difficulty and block
                  speed. This calculator assumes blocks on a 10 minute interval
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="block w-4/12 text-sm font-semibold">{globalHashrate} EH/s</span>
          </aside>
          <aside className="mb-4 flex items-center justify-between">
            <div className="flex w-6/12 items-start">
              <span className="text-sm">Difficulty estimate</span>
              <Tooltip placement="top">
                <TooltipTrigger>
                  <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
                </TooltipTrigger>

                <TooltipContent className="w-1/6 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
                  Determines how hard it is to hash out a winning block
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="w-4/12 text-sm font-semibold">
              {Number(difficulty).toPrecision(4)}T <sup>Hashes/Block</sup>
            </span>
          </aside>
          <aside className="mb-4 flex items-center justify-between">
            <div className="flex w-6/12 items-start">
              <span className="text-sm">Hashprice estimate</span>
              <Tooltip placement="top">
                <TooltipTrigger>
                  <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
                </TooltipTrigger>

                <TooltipContent className="w-1/6 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
                  This how much bitcoin can be earned per TH/s per day, based on a &ldquo;full pay-per-share&ldquo; (FPPS) mining pool
                  payout
                </TooltipContent>
              </Tooltip>
            </div>
          </aside>
          <aside className="mb-4 ml-4 flex items-center justify-between">
            <div className="flex w-4/12 items-start">
              <span className="text-xs">Base hashprice</span>
              <Tooltip placement="top">
                <TooltipTrigger>
                  <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
                </TooltipTrigger>

                <TooltipContent className="w-fit rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
                  Block subsidy only
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="mr-2 w-4/12 text-xs font-semibold">{baseHashprice} sats/TH/s/day</span>
          </aside>
          <aside className="mb-4 ml-4 flex items-center justify-between">
            <div className="flex w-6/12 items-center">
              <span className="text-xs">Tx fee percentage</span>
            </div>
            <span className="mr-2 w-4/12 text-xs font-semibold">{feePercentage}%</span>
          </aside>
          <aside className="mb-4 ml-4 flex items-center justify-between">
            <div className="flex w-4/12 items-start">
              <span className="text-sm font-semibold">Total</span>
              <Tooltip placement="top">
                <TooltipTrigger>
                  <QuestionMarkCircleIcon className="ml-1 h-4 w-4" />
                </TooltipTrigger>

                <TooltipContent className="w-fit rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
                  Total hashprice (with tx fees, based on {feePercentage}% fee percentage)
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="mr-2 w-4/12 text-sm font-semibold">{Math.floor(hashprice)} sats/TH/s/day</p>
          </aside>
        </div>
        <p className="mb-4 mt-8 text-center text-sm">Adjust global network hashrate</p>
        <label htmlFor="hashrate" className="flex items-center">
          <p className="mr-4 text-sm">100 EH/s</p>
          <input
            onChange={e => {
              setGlobalHashrate(parseInt(e.target.value))
            }}
            type="range"
            id="hashrate"
            min={100}
            max={1000}
            name="volume"
            placeholder="global hashrate"
            value={Math.floor(globalHashrate)}
          />
          <p className="ml-4 text-sm">1000 EH/s</p>
        </label>

        <p className="mb-2 mt-4 flex items-center text-center text-sm">
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
        </a>
      </div>
    </section>
  )
}
