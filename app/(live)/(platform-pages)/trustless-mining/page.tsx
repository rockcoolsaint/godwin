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
                  When you rent an apartment, you put down a security deposit when you take the lease. Landlords require this deposit
                  because if the market changes, they could lose out on the rent promised in the lease agreement.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  In a similar way, your auction payment and a security deposit from the seller is held in escrow until after your hashrate
                  is delivered to your mining pool account.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  If you fail to receive your hashrate due to changing market conditions, you receive your money back and the seller’s
                  deposit.
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
                  When you pay for your mining, the funds are deposited in a multisig wallet on the bitcoin blockchain. These funds are held
                  in escrow and the seller receives their payment after your hashrate is delivered.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  If you get less hashrate than you paid for, you receive make-up hashrate or a refund. And soon, buyers will have direct
                  access to the escrow via public key.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  If you fail to receive your hashrate due to an outage or changing market conditions, you will receive make-up hashrate
                  from another source or your money back.
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
