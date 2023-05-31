import Image from 'next/image'
import Container from 'src/core/components/Container'
import trustlessMining from 'src/assets/webp/trustless_mining.webp'
import miningPlan from 'src/assets/webp/mining_plan.webp'
import sla from 'src/assets/webp/sla.webp'
import trust from 'src/assets/webp/trust.webp'
import Link from 'src/components/shared/Link'

function LearnMore() {
  return (
    <Container className="!p-0">
      <div className="pt-24">
        <div className="relative isolate overflow-hidden bg-gradient px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">How does Rigly work?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">Rigly is an auction marketplace for bitcoin mining</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/collections"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </Link>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx="512" cy="512" r="512" fill="url(#f5effcb0-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#1b76df" />
                <stop offset="1" stopColor="#18e633" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Rigly is a new mining marketplace</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Now you can bid on mining hashrate and start mining at a fair market price - without buying hardware
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
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Trustless Mining</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  In our model, Sellers are paid after hashrate is delivered. <b>If your miner fails to deliver, you receive a refund</b>
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
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">How does your mining plan start?</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  After you win a mining auction, you receive a mining pool account and login to a web portal to configure your hashrate.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  Already have a mining pool account Great! You may configure your hashrate to go there
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
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">What could go wrong?</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  If you don&apos;t get the hashrate you paid for, we&apos;ve got your back.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  All mining plans have a daily performance and uptime service level agreement (SLA) from the seller. If your mining
                  subscription fails to meet the SLA, you receive make-up hashrate. If your miner disappears, you receive a refund
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
      <div className="overflow-hidden bg-white py-10 sm:py-24">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">How can I trust Rigly?</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                  We are a new project started by people who are passionate about bitcoin. Read our story
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
    </Container>
  )
}

export default LearnMore
