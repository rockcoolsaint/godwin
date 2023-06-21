/* eslint-disable react/jsx-no-bind */
'use client'

import { useEffect, useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import SatsSvg from 'src/assets/svg/sats.svg'

export default function AuctionCalculator() {
  const [bid, setBid] = useState(0)
  const [futureHashPrice, setFutureHashPrice] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [daysOfMining, setDaysOfMining] = useState(0)
  const [futureMiningPayout, setFutureMiningPayout] = useState(0)
  const [futureMiningHashprice, setFutureMiningHashprice] = useState(0)

  function formatMoney(number: number) {
    return Number(number.toFixed(2)).toLocaleString()
  }

  useEffect(() => {
    function handleCalculateRigly() {
      const futureMiningPayout = futureHashPrice * speed * daysOfMining
      let miningHashPrice = 0
      if (speed > 0 && daysOfMining > 0) miningHashPrice = bid / speed / daysOfMining

      setFutureMiningPayout(futureMiningPayout)
      setFutureMiningHashprice(miningHashPrice)
    }

    handleCalculateRigly()
  }, [bid, futureHashPrice, speed, daysOfMining])

  return (
    <section className=" rounded-3 border px-4 py-3">
      <div className="flex">
        <div className="border-3 border-yellow-600">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="mb-3 flex items-center text-sm font-semibold text-dark-200">
              What is your bid? <ExclamationCircleIcon className="ml-1 inline h-4 w-4" />
            </label>
            <div className="flex items-center">
              <input
                onChange={e => {
                  setBid(parseInt(e.target.value) || 0)
                }}
                type="number"
                className="w-full rounded-lg border border-gray-400 p-2"
                id="#1"
                placeholder="0"
              />
              <span className="ml-1 text-sm text-dark-100">Sats</span>
            </div>
          </div>
          <div className="mb-3 mt-7">
            <label htmlFor="hashprice" className="mb-3 flex items-center text-sm font-semibold text-dark-200">
              What is future hashprice? <ExclamationCircleIcon className="ml-1 inline h-4 w-4" />
            </label>
            <div className="flex items-center">
              <input
                onChange={e => {
                  setFutureHashPrice(parseInt(e.target.value) || 0)
                }}
                className="w-full"
                type="range"
                id="hashprice"
                name="volume"
                min="0"
                max="800"
              />
              <span className="ml-1 w-14 text-center text-sm text-dark-100">Sats per TH/s/Day</span>
            </div>
          </div>
          <div className="mb-3 mt-7">
            <label htmlFor="speed" className="mb-3 flex items-center text-sm font-semibold text-dark-200">
              Speed
            </label>
            <div className="flex items-center">
              <input
                onChange={e => {
                  setSpeed(parseInt(e.target.value) || 0)
                }}
                type="number"
                className="w-full rounded-lg border border-gray-400 p-2"
                id="speed"
                placeholder="0"
              />
              <span className="ml-1 text-sm text-dark-100">TH/s</span>
            </div>
          </div>
          <div className="mb-3 mt-7">
            <label htmlFor="daysOfMining" className="mb-3 flex items-center text-sm font-semibold text-dark-200">
              Days of Mining
            </label>
            <div className="flex items-center">
              <input
                onChange={e => {
                  setDaysOfMining(parseInt(e.target.value) || 0)
                }}
                type="number"
                className="w-full rounded-lg border border-gray-400 p-2"
                id="daysOfMining"
                placeholder="0"
              />
              <span className="ml-1 text-sm text-dark-100">Days</span>
            </div>
          </div>
        </div>

        <aside className="border-3 ml-6 rounded-xl border-green-700 bg-gray-100 px-4 py-2">
          <div className="mb-7">
            <p className="mb-3 text-sm font-semibold text-dark-100">Your mining hashprice (per TH/s/day)</p>
            <h3 className="flex items-center" id="formula-result-#10">
              <span>{formatMoney(futureMiningHashprice) || 0}</span> <SatsSvg className="ml-2" />
            </h3>
          </div>
          <div className="mb-7">
            <p className="mb-3 text-sm font-semibold text-dark-100">Your mining cost ©</p>
            <h3 className="flex items-center" id="formula-result-#5">
              <span>{formatMoney(bid)}</span>
              <SatsSvg className="ml-2" />
            </h3>
          </div>
          <div className="mb-7">
            <p className="mb-3 text-sm font-semibold text-dark-100">Estimate future mining payout</p>
            <h3 className="flex items-center" id="formula-result-#11">
              <span>{formatMoney(futureMiningPayout)}</span> <SatsSvg className="ml-2" />
            </h3>
          </div>
        </aside>
      </div>
    </section>
  )
}
