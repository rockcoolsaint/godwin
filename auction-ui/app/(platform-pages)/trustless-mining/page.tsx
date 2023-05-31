import Image from 'next/image'
import Container from 'src/core/components/Container'
import miningPlan from 'src/assets/webp/mining_plan.webp'
import trust from 'src/assets/webp/trust.webp'
import multisig2 from 'src/assets/png/multisig2.png'

function TrustlessMining() {
  return (
    <Container className="!p-0">
      <div className="pt-24">
        <div className="relative isolate overflow-hidden bg-gradient px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Trustless Mining Escrow</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">What if my mining fails to deliver?</p>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Safety through security (deposits)</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  When you rent an apartment, you put down a security deposit when you take the lease. Landlords require this because if the
                  market changes, they would lose out on the rent promised in the lease agreement.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  In a similar way, marketplace sellers on Rigly receive payout deposits in multisig escrow.
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
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">How Escrow Works</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  When you pay for your mining plan, the funds are deposited in a 2:3 multisig with three keys:
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">- Rigly </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">- Marketplace Seller</p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">- 3rd party observer</p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  The Seller may only withdraw funds after hashrate is delivered.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  If your miner goes away, Rigly performs a refund request - and if necessary, the 3rd party applies their key to approve
                  the refund based on hashrate monitoring data
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Soon, we plan to add support for Buyers to directly participate in the multisig escrow.
                </p>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <Image src={multisig2} alt="Product screenshot" width="1432" height="442" className="-mb-12 w-[37rem] max-w-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-10 sm:pb-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Guaranteed delivery</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  If your mining is offline for an extended period of time, you receive a refund of the balance of your prepaid mining plan
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
    </Container>
  )
}

export default TrustlessMining
