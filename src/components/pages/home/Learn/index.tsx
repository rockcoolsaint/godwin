import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import Link from 'src/components/shared/Link'
import { useMobileScreen } from 'src/hooks/useIsMobile'

export default function Learn() {
  const isMobile = useMobileScreen()

  return (
    <div className="font-epilogue mb-40">
      <div className="max-w-8xl 2xl:py-30 mx-auto py-10 lg:px-8 2xl:mt-20">
        <div className="mx-auto max-w-6xl divide-gray-900/10">
          {/* Headers side by side */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-1">
              <p className="text-3xl">Mining made easy.</p>
            </div>
            <div className="flex-1">
              <p className="text-3xl">Bitcoin Only. Start mining now for just a few sats.</p>
            </div>
          </div>
          
          {/* Accordions side by side */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6 divide-y divide-gray-900/10">
              <Disclosure as="div" className="pt-6" defaultOpen={false}>
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <h2 className="text-sm font-semibold text-primary lg:text-2xl">What is the problem?</h2>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <ChevronUpIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-3 w-3 text-primary lg:h-5 lg:w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-base text-black lg:text-lg">
                        <p>Earning a profit at bitcoin mining is too hard.</p>
                        <ol className="mt-4 list-decimal pl-8">
                          <li className="mt-1">
                          <b>Expensive Equipment:</b> ASIC rigs are costly and become outdated.
                          </li>
                          <li><b>Electricity Cost:</b> Profitable mining depends on securing low-cost energy.</li>
                          <li><b>Trust:</b> Hosted mining require trust, which has led to many rug pulls.</li>
                        </ol>
                        <br/><p>These challenges restrict mining to a small group, increasing mining centralization which <Link href="https://www.youtube.com/watch?v=ebgdTxVOV9k" styled>threatens the future of bitcoin.</Link></p>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              
              <Disclosure as="div" className="pt-6" defaultOpen={false}>
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
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-base text-black lg:text-lg">
                       <p>Rigly auctions level the playing field, so everyone can bid on hashrate and mine bitcoin.</p>
                       <ol className="mt-4 list-decimal pl-8">
                        <li><b>Cost-Effective:</b> Start mining for 1,000 sats</li>
                        <li><b>Potential profit:</b> No one knows future hashprice. Do your research and make your bid.</li>
                        <li><b>Trustless Escrow:</b> 50% of your payment is held in escrow, so you don't lose everything if the seller defaults</li>
                       </ol>
                       <br/>
                       <p><b>The Impact:</b> Every bitcoiner can mine, and mining farms can grow. It's a win-win that promotes a decentralized network.</p>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>

            <div className="flex-1 space-y-6 divide-y divide-gray-900/10">
              <Disclosure as="div" className="pt-6" defaultOpen={false}>
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
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
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-base text-black lg:text-lg">
                        <b>P2P - not cloud mining.</b> Your hashrate is sent peer-to-peer via stratum protocol from mining farm to your pool account.
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="pt-6" defaultOpen={false}>
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
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
                      <div className="text-base text-black lg:text-lg">
                        <p>We plan to <b>build a scoring system</b> based on delivery history. Mining farms with track records may fetch a premium price at auction.</p>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}