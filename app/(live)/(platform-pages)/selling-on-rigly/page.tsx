import Image from 'next/image'
import Container from 'src/core/components/Container'
import trustlessMining from 'src/assets/webp/trustless_mining.webp'
import miningPlan from 'src/assets/webp/mining_plan.webp'
import sla from 'src/assets/webp/sla.webp'
import trust from 'src/assets/webp/trust.webp'

function SellingOnRigly() {
  return (
    <Container className="!p-0">
      <div className="pt-24">
        <div className="relative isolate overflow-hidden bg-gradient px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Sell Hashrate on Rigly</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">Earn more from your hashrate</p>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Earn more from your hashrate</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Mining plans offer a fixed payout premium on top of future spot hashprice
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Why pay fees to a mining pool when you can earn more by listing on Rigly?
                </p>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <Image src={trust} alt="Product screenshot" width="1432" height="442" className="-mb-12 w-[37rem] max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Grow the bitcoin community</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Bitcoin mining is awesome. Listing your hashrate allows more bitcoiners to mine and share the joy in earning bitcoin
                  directly from the protocol
                </p>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <Image src={trust} alt="Product screenshot" width="1432" height="442" className="-mb-12 w-[37rem] max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-10 sm:py-8">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">How do payouts work?</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  You receive payment in bitcoin based on hashrate received at our stratum proxy
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Your hashprice is based on a canonical data source: Luxor, Poolin, or BTC.com
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Funds are held in multisig escrow. You receive payouts at each mining difficulty adjustment
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Rigly&apos;s payout premium is <b>at a percentage over FPPS hashprice</b>
                </p>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <Image src={trustlessMining} alt="Product screenshot" width="1432" height="442" className="-mb-12 w-[37rem] max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-10 sm:py-24">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  What if my mining sells for a low price?
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Rigly offers miners a fixed premium over future spot hashprice
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Regardless of your listing&apos;s auction close price, you earn the payout premium
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Rigly covers any difference in future hashprice while we build out our marketplace
                </p>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <Image src={miningPlan} alt="Product screenshot" width="1432" height="442" className="-mb-12 w-[37rem] max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-10 sm:py-24">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Where do I sign up?</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  We are working with select miners as we develop Rigly. Please send us an email to learn more
                </p>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <Image src={sla} alt="Product screenshot" width="1432" height="442" className="-mb-12 w-[37rem] max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SellingOnRigly
