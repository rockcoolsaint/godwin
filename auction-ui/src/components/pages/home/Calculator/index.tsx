import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { getHashRate } from 'src/api/hashprice'

// To show on calculator
// Estimated future global network hashrate (eg 450 EH/s)
// difficulty estimate (based on 1)
// hashprice estimate (based on 1)

export function HomepageCalculator() {
  //   const hashrate = await getHashRate()
  //   const networkHashrate = hashrate.currentHashrate / 1_000_000_000_000_000_000
  //   console.log('networkHashrate', networkHashrate)

  return (
    <section>
      <h1>Calculator</h1>
      <div className="flex h-96 w-96 flex-col items-center justify-between rounded-md border-2 border-dark-100 p-4">
        <div className="w-full border border-dark-100">
          <p className="mb-2 flex items-center justify-between">
            <span>Network hashrate</span> <ArrowLongRightIcon className="h-4 w-12" /> <span>400 EH/s</span>
          </p>
          <p className="mb-2 flex items-center justify-between">
            <span>Difficulty estimate</span> <ArrowLongRightIcon className="h-4 w-12" /> <span>400 EH/s</span>
          </p>
          <p className="mb-2 flex items-center justify-between">
            <span>Hashprice estimate</span> <ArrowLongRightIcon className="h-4 w-12" /> <span>400 EH/s</span>
          </p>
        </div>
        <button className="mt-4 block w-6/12 rounded-lg bg-gradient p-4 px-5 text-base capitalize text-white hover:bg-gradient-hover sm:mt-2">
          Place bid
        </button>
      </div>
    </section>
  )
}
