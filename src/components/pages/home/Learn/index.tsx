import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import Link from 'src/components/shared/Link'
import { useMobileScreen } from 'src/hooks/useIsMobile'

export default function Learn() {
  const isMobile = useMobileScreen()

  return (
    <div className="font-epilogue">
      <div className="max-w-8xl 2xl:py-30 mx-auto py-10 lg:px-8 2xl:mt-20">
        <div className="mx-auto max-w-6xl divide-gray-900/10">
          <div className="flex w-full justify-between">
            <div className="space-y-6 divide-y divide-gray-900/10 px-4 sm:w-6/12">
              <div>
                <p className="text-3xl">Mining made easy.</p>
                </div>
              <Disclosure as="div" className="pt-6" defaultOpen={true}>
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
                        <ol className="mt-4 list-decimal pl-8">
                          <li className="mt-1">
                          Mining bitcoin requires buying expensive ASIC rigs
                          </li>
                          <li>Mining profitably requires cheap electricity</li>
                          <li>Funding new mining operations is hard</li>
                          </ol>
                        <br/><p>Thus very few bitcoiners can mine due to these barriers to entry, leading to mining centralization.</p>
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
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-base text-black lg:text-lg">
                       <p>Rigly levels the playing field, so everyone can bid on hashrate and mine bitcoin.</p>
                       <ol className="mt-4 list-decimal pl-8">
                        <li>Buyers bid on hashrate at a fair price</li>
                        <li>Buyers have potential to mine at a profit</li>
                        <li>Sellers get partial payment upfront</li>
                       </ol>
                       <br/><p>Bitcoiners get to mine and mining farm owners can scale their operations. It's a win-win.</p>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            {!isMobile && (
              <div className="hidden w-6/12 pl-20 sm:flex">
                {/* Removed lottie image - Evan 9/23/24 */}
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
              <Disclosure as="div" className="pt-6" defaultOpen={true}>
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
              <Disclosure as="div" className="pt-6" defaultOpen={true}>
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
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
                      <div className="text-base text-black lg:text-lg">
                        <b>Mining farms get a percentage of payment upfront.</b> The balance is held in a 2:2 multisig escrow, paid as the buyer receives their hashrate.
                      </div>
                    </Disclosure.Panel>
                  </>
                )} 
              </Disclosure>
            </div>
            {!isMobile && (
              <div className="order-1 hidden w-6/12 justify-start sm:flex">
                {/* Removed lottie image - Evan 9/23/24 */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
