import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import Link from 'src/components/shared/Link'
import mine_easy from 'src/assets/mineeasy.json'
import start_mining from 'src/assets/startminingtoday.json'
import dynamic from 'next/dynamic'
import { useMobileScreen } from 'src/hooks/useIsMobile'

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
})

export default function Learn() {
  const isMobile = useMobileScreen()

  return (
    <div className="font-epilogue">
      <div className="max-w-8xl 2xl:py-30 mx-auto py-10 lg:px-8 2xl:mt-20">
        <div className="mx-auto max-w-6xl divide-gray-900/10">
          <div className="flex w-full justify-between">
            <div className="space-y-6 divide-y divide-gray-900/10 px-4 sm:w-6/12">
              <div>
                <p className="text-lg lg:text-3xl">Mining made easy.</p>
                <p className="mt-2 text-base">
                  Mining is a lottery to create new blocks in the Bitcoin blockchain.
                </p>
              </div>
              <Disclosure as="div" className="pt-6" defaultOpen={true}>
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <h2 className="text-sm font-semibold text-primary lg:text-2xl">What are mining's problems?</h2>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <ChevronUpIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12" defaultOpen={true}>
                      <div className="text-xs text-black lg:text-base">
                        <ol className="mt-4 list-decimal pl-8">
                          <li>Mining is highly centralized at the pool level, risking the loss of censorship resistance.</li>
                          <li className="mt-1">
                           ASIC mining rigs are expensive and consume a lot of power, requiring low electricity rates to cover costs and payback over time.
                          </li>
                          <li>Only the largest mining farms have access to funding.</li>
                        </ol>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              
              <Disclosure as="div" className="pt-6" defaultOpen={true}>
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <h2 className="text-sm font-semibold text-primary lg:text-2xl">How does Rigly help?</h2>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <ChevronUpIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12" defaultOpen={true}>
                      <div className="text-xs text-black lg:text-base">
                        Mining farms sell hashrate at auction to the highest bidder. Buyers get access to hashrate at a fair price, sellers get access to funding.
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            {!isMobile && (
              <div className="hidden w-6/12 pl-20 sm:flex">
                <Lottie animationData={start_mining} async />
              </div>
            )}
          </div>
        </div>
        {/* Real machines */}
        <div className="mx-auto mt-20 max-w-6xl divide-gray-900/10 sm:mt-40">
          <div className="flex w-full justify-between">
            <div className="order-2 w-full space-y-6 divide-y divide-gray-900/10 px-4 sm:w-6/12 sm:pl-20">
              <div>
                <p className="text-3xl">Bitcoin Only. Start mining now for just a few sats.</p>
              </div>
              <Disclosure as="div" className="pt-6" defaultOpen={true}>
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900" defaultOpen={true}>
                        <h2 className="text-sm font-semibold text-primary lg:text-2xl">100% real hashrate</h2>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <ChevronUpIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12" defaultOpen={true}>
                      <div className="text-xs text-black lg:text-base">
                        <b>P2P - not cloud mining.</b> Your hashrate is sent peer-to-peer via stratum protocol from mining farm to your pool account.
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="pt-6" defaultOpen={true}>
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900" defaultOpen={true}>
                        <h2 className="text-sm font-semibold text-primary lg:text-2xl">When are sellers paid?</h2>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <ChevronUpIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-xs text-black lg:text-base">
                        <b>Mining farms get up to 50% payment upfront.</b> The balance is held in a 2:2 multisig escrow, paid as you receive your hashrate. 
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="pt-6" defaultOpen={true}>
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900" defaultOpen={true}>
                        <h2 className="text-sm font-semibold text-primary lg:text-2xl">Reputation system</h2>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <ChevronUpIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-xs text-black lg:text-base">
                        <p>The auction price factors in reputatio: tnrustworthy mining farms fetch a premium price.</p>
                        <br/>
                        <p>Over time, we are building a scoring system to quantify delivery history. Sellers with track records get access to advance funding on Rigly and grow their operations faster.</p>
                        </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            {!isMobile && (
              <div className="order-1 hidden w-6/12 justify-start sm:flex">
                <Lottie animationData={mine_easy} async />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
