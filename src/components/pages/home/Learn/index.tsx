import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import MineEasy from 'src/assets/svg/mine_easy.svg'
import RealMachines from 'src/assets/svg/real_machines.svg'
import Link from 'src/components/shared/Link'

export default function Learn() {
  return (
    <div className="font-epilogue">
      <div className="max-w-8xl mx-auto py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-6xl divide-gray-900/10">
          <div className="flex w-full justify-between">
            <div className="space-y-6 divide-y divide-gray-900/10 px-4 sm:w-6/12">
              <div>
                <p className="text-3xl">Mining made easy for everyone.</p>
                <p className="mt-2 text-2xl">
                  The Rigly platform was developed to help remove the accessibility barrier to mining for more Bitcoiners and the
                  bitcoin-curious.
                </p>
              </div>
              <Disclosure as="div" className="pt-6">
                {({ open }) => (
                  <>
                    <div>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-2xl font-semibold">What is bitcoin mining?</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <ChevronUpIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-2xl text-black">
                        Mining is a lottery to create new blocks in the Bitcoin blockchain. There are two main purposes for mining:
                        <ol className="list-decimal pl-8">
                          <li>To permanently add transactions to the blockchain without the permission of any entity.</li>
                          <li>
                            To fairly distribute the 21 million bitcoin supply by rewarding new coins to miners who spend real world
                            resources (i.e. electricity) to secure the network.
                          </li>
                        </ol>
                        <Link href="https://braiins.com/" className="mt-10 block text-black underline hover:no-underline">
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
                        <span className="text-2xl font-semibold">Why buy hashrate vs mine with a rig?</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <ChevronUpIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-2xl text-black">
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
                        <span className="text-2xl font-semibold">Isn’t bitcoin mining profitable?</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <ChevronUpIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-2xl text-black">
                        No one knows where mining difficulty and hashprice will be in the future. Rigly offers a way for bitcoin miners to
                        potentially earn more from their hashrate, over the long term, than they would by mining themselves.
                      </div>
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
                        <span className="text-2xl font-semibold">100% real hashrate</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <ChevronUpIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-2xl text-black">
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
                        <span className="text-2xl font-semibold">Payments held in escrow</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <ChevronUpIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-2xl text-black">
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
                        <span className="text-2xl font-semibold">Bitcoin Only</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <ChevronUpIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </div>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="text-2xl text-black">
                        Rigly is non-custodial—not a money transmitter. Bitcoin in, hash out. All payments are in bitcoin (BTC) based on the
                        transaction price in bitcoin.
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
