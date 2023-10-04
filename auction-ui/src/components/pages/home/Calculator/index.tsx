'use client'

import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { getDifficultyAdjustment, getBlockTipHeight, getHashRate, getHashPrice, HashpriceDict } from 'src/api/hashprice'
import { formatDistance, fromUnixTime } from 'date-fns'

// To show on calculator
// Estimated future global network hashrate (eg 450 EH/s)
// difficulty estimate (based on 1)
// hashprice estimate (based on 1)

/**
 * How to calculate hashprice based on network speed

Hashprice = Block reward + Transaction fees / Network Hashrate

Let's consider an example:

current block reward (6.25 btc)
2% tx fee rate
409 EH/s network hashrate
>>> ((6.25*144)+(6.25*144*0.02)) / 408879965
.00000224515769560878
225 sats per TH/s/day
 * */

export function HomepageCalculator() {
  const [difficulty, setDifficulty] = useState(0)
  const [hashrateRaw, setHashrateRaw] = useState(0)
  const [hashrate, setHashrate] = useState(0)
  const [hashRateModified, setHashRateModified] = useState(0)
  const [hashprice, setHashprice] = useState(0)
  const [epoch, setEpoch] = useState<HashpriceDict>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const hashrate = await getHashRate()
        const blockHeight = await getBlockTipHeight()
        const epochData = await getHashPrice()

        const difficultyPeriod = blockHeight / 2016

        setHashrate(hashrate.currentHashrate / 1_000_000_000_000_000_000)
        setHashrateRaw(hashrate.currentHashrate)
        setDifficulty(hashrate.currentDifficulty / 1_000_000_000_000)

        let blockReward = 6.25
        let txFee = 0.02
        let networkHashrate = hashrate.currentHashrate / 1_000_000_000_000
        let hashprice = (blockReward * 144 + blockReward * 144 * txFee) / networkHashrate
        setHashprice(hashprice * 100000000)
        setEpoch(epochData)

        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    setHashRateModified(hashrateRaw / 1000000000000000)
    let blockReward = 6.25
    let txFee = 0.02
    let networkHashrate = hashrateRaw / 1_000_000_000_000
    let hashprice = (blockReward * 144 + blockReward * 144 * txFee) / networkHashrate
    setHashprice(hashprice * 100000)
  }, [hashrateRaw, setHashrateRaw])

  return (
    <section className="relative">
      <h1
        style={{ zIndex: 0 }}
        className="relative -bottom-1 z-10 w-3/12 rounded-t-lg border-2 border-dark-100 bg-slate-100 p-2 text-center text-sm"
      >
        Epoch - {401}
      </h1>
      <div
        style={{ zIndex: 100 }}
        className="relative flex h-96 w-[34rem] flex-col items-center justify-between rounded-md border-2 border-dark-100 bg-white p-4 shadow-2xl"
      >
        <div className="w-full">
          <p className="my-4 flex items-center justify-between">
            <span className="w-6/12">Network hashrate</span>
            {/* <ArrowLongRightIcon className="h-4 w-12" /> */}
            <span className="w-4/12">{Math.floor(hashrate)} EH/s</span>
          </p>
          <p className="mb-4 flex items-center justify-between">
            <span className="w-6/12">Difficulty estimate</span>
            {/* <ArrowLongRightIcon className="h-4 w-12" />{' '} */}
            <span className="w-4/12">
              {Number(difficulty).toPrecision(4)}T <sup>Hashes/Block</sup>
            </span>
          </p>
          <p className="mb-4 flex items-center justify-between">
            <span className="w-6/12">Hashprice estimate</span>
            {/* <ArrowLongRightIcon className="h-4 w-12" />{' '} */}
            <span className="w-4/12">{Math.floor(hashprice)} TH/s/day</span>
          </p>
        </div>
        <p style={{ marginBottom: -40 }} className="-mb-4 text-center">
          Adjust difficulty estimate
        </p>
        <div className="flex items-center">
          <p className="mr-4">0 EH/s</p>
          <input
            onChange={e => {
              setHashrateRaw(parseInt(e.target.value))
            }}
            type="range"
            id="#hashprice"
            min={0}
            max={1000000000000000000}
            name="volume"
            placeholder="hashprice"
            // value={hashRateModified}
          />
          <p className="ml-4">{Math.floor(hashRateModified)} EH/s</p>
        </div>
        <a
          href="#auction-market"
          className="mt-4 block w-4/12 rounded-lg bg-gradient p-4 px-5 text-center text-base capitalize text-white hover:bg-gradient-hover sm:mt-2"
        >
          Place bid
        </a>
      </div>
    </section>
  )
}
