import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import MineEasy from 'src/assets/svg/mine_easy.svg'
import RealMachines from 'src/assets/svg/real_machines.svg'
import Link from 'src/components/shared/Link'

export default function Learn() {
  return (
    <div className="font-epilogue">
      <div className="max-w-8xl 2xl:py-30 mx-auto py-10 lg:px-8 2xl:mt-20">
        <div className="mx-auto max-w-6xl divide-gray-900/10">
          <div className="flex w-full justify-between">
            <div className="space-y-6 divide-y divide-gray-900/10 px-4 sm:w-6/12">
              <div>
                <p className="text-lg lg:text-3xl">Mining made easy for everyone.</p>
                <p className="mt-2 text-base">
                  The Rigly platform was developed to help remove the accessibility barrier to mining for more Bitcoiners and the
                  bitcoin-curious.
                </p>
              </div>
              <Disclosure as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <h2 className="text-sm font-semibold text-primary lg:text-2xl">What is bitcoin mining?</h2>
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
                      <div className="text-xs text-black lg:text-base">
                        Mining is a lottery to create new blocks in the Bitcoin blockchain. There are two main purposes for mining:
                        <ol className="mt-4 list-decimal pl-8">
                          <li>To permanently add transactions to the blockchain without the permission of any central authority.</li>
                          <li className="mt-1">
                            Current mining rigs are worth several thousand dollars and consume a lot of power, requiring low electricity
                            rates to cover costs and payback over time. ASICs are special purpose machines that require proper operating
                            conditions, oversight, and maintenance. Buying hashrate offers a lower entry price with less time commitment.
                          </li>
                        </ol>
                        <Link href="https://braiins.com/" className="mt-4 block font-semibold text-black underline hover:no-underline">
                          Learn more at Braiins
                        </Link>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <h2 className="text-sm font-semibold text-primary lg:text-2xl">Why buy hashrate vs mine with a rig?</h2>
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
                        Bitcoin mining rigs are expensive, special purpose machines. Current mining rigs are several thousand dollars. Rig
                        rentals offer a lower price and better value.
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <h2 className="text-sm font-semibold text-primary lg:text-2xl">What are the incentives</h2>
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
                        Miners redirect their hashrate through Rigly in exchange for a premium over the market rate paid out by mining
                        pools. Without this premium, there would be no reason for miners to give up their hashrate. Buyers in turn pay a
                        premium to use existing computing power as they see fit.
                      </div>
                      <Link
                        href="https://blog.rigly.io/why-buy-spot-hashrate/"
                        className="mt-4 block font-semibold text-black underline hover:no-underline"
                      >
                        Learn more at Why Buy Spot Hashrate
                      </Link>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <div className="hidden w-6/12 pl-20 sm:flex">
              <MineEasy />
            </div>
          </div>
        </div>
        {/* Real machines */}
        <div className="mx-auto mt-20 max-w-6xl divide-gray-900/10 sm:mt-40">
          <div className="flex w-full justify-between">
            <div className="order-2 w-full space-y-6 divide-y divide-gray-900/10 px-4 sm:w-6/12 sm:pl-20">
              <div>
                <p className="text-3xl">Start mining now for just a few sats. Real machines, no rug pulls.</p>
              </div>
              <Disclosure as="div" className="pt-6">
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
                      <div className="text-xs text-black lg:text-base">
                        Hashrate is sourced directly from mining farms and delivered to your pool account. Track every hash you pay for.
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <h2 className="text-sm font-semibold text-primary lg:text-2xl">Payments held in escrow</h2>
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
                        While your hashrate is delivered, your payment is held in a 2:2 bitcoin multisig address. Sellers don’t get paid
                        until you receive your hashrate.
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <h2 className="text-sm font-semibold text-primary lg:text-2xl">Bitcoin Only</h2>
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
                        <p>
                          Rigly is non-custodial—not a money transmitter. Bitcoin in, hash out. All payments are in bitcoin (BTC) based on
                          the transaction price in bitcoin.{' '}
                        </p>
                        <p>
                          We&apos;re working on bringing buyer&apos;s into the escrow with a 2:3 multisig addresses. Get your PSBT support
                          wallets ready!
                        </p>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <div className="order-1 hidden w-6/12 justify-start sm:flex">
              <RealMachines />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
