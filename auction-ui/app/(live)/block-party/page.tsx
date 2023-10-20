'use client'
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Tab, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { formatMoney } from 'src/utils/currency'
import { getBlockParties } from 'src/api/block-party/getBlockParties'
import { useAccountContext } from 'src/providers/AccountProvider'
import BlockPartyDetails from 'src/components/pages/block-party/Details'
import BlockPartyBuyers from 'src/components/pages/block-party/Buyers'
import BlockPartyOnchainDetails from 'src/components/pages/block-party/OnchainDetails'

const DURATION = [
  { name: 'Small', value: 21, amount: 5500 },
  { name: 'Medium', value: 100, amount: 10500 },
  { name: 'Large', value: 210, amount: 20500 },
]

function BlockPartyPage() {
  const [currentTab, setCurrentTab] = useState(0)
  const [selectDuration, setSelectDuration] = useState(DURATION[0])
  const { token } = useAccountContext()
  const [blockParties, setBlockParties] = useState([])

  const handleSelectDuration = (val: any) => {
    setSelectDuration(val)
  }

  useEffect(() => {
    const fetchBlockParties = async () => {
      if (!token) {
        return
      }

      const data = await getBlockParties({ token: token })
      setBlockParties(data)
    }

    fetchBlockParties()
  }, [token])

  return (
    <div className="mx-auto my-28 flex max-w-7xl flex-col justify-center gap-12 py-6 sm:flex-row sm:gap-36 sm:px-6 lg:px-8">
      <div className="overflow-hidden bg-white shadow-xl sm:w-2/5 sm:rounded-lg">
        <Tab.Group onChange={setCurrentTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              className={({ selected }) =>
                `flex-1 ${
                  selected ? 'bg-blue-900 text-white' : 'text-blue-900 hover:text-blue-900'
                } rounded-xl px-4 py-2 text-center text-sm font-medium tracking-wider`
              }
            >
              Details
            </Tab>
            <Tab
              className={({ selected }) =>
                `flex-1 ${
                  selected ? 'bg-blue-900 text-white' : 'text-blue-900 hover:text-blue-900'
                } rounded-xl px-4 py-2 text-center text-sm font-medium tracking-wider`
              }
            >
              Buyers
            </Tab>
            <Tab
              className={({ selected }) =>
                `flex-1 ${
                  selected ? 'bg-blue-900 text-white' : 'text-blue-900 hover:text-blue-900'
                } rounded-xl px-4 py-2 text-center text-sm font-medium tracking-wider`
              }
            >
              Onchain
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="w-full rounded-xl bg-white p-3">
              <BlockPartyDetails />
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white p-3">
              <BlockPartyBuyers />
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white p-3">
              <BlockPartyOnchainDetails />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="">
        <h1>Block Party</h1>
        <p className="mt-4 text-sm">Happy White Paper Day!</p>
        <p className="text-sm">Solo mine with Rigly - Learn more</p>
        <aside className="mt-2">
          <div className="mb-6 grid gap-2">
            <div className="grid grid-cols-2 text-sm">
              <p>Hashrate</p>
              <p className="font-bold">21 PH/s</p>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <p>Hashprice</p>
              <p className="font-bold">250 sats per TH/s/day</p>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <p>Duration</p>
              <p className="font-bold">24 hours - October 31 @ 00:00 UTC</p>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <p></p>
              <Listbox value={selectDuration} onChange={handleSelectDuration}>
                {({ open }) => (
                  <div className="relative">
                    <Listbox.Button className="relative w-9/12 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
                      <span className="block truncate">
                        {selectDuration.name} ({selectDuration.value} TH/s)
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-9/12 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/50 focus:outline-none sm:text-sm">
                        {DURATION.map(value => (
                          <Listbox.Option
                            key={value.name}
                            className={({ active }) =>
                              clsx(active ? 'bg-primary text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9')
                            }
                            value={value}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                  {value.name} ({value.value} TH/s)
                                </span>

                                {selected ? (
                                  <span
                                    className={clsx(
                                      active ? 'text-white' : 'text-primary',
                                      'absolute inset-y-0 right-0 flex items-center pr-4',
                                    )}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                )}
              </Listbox>
            </div>
          </div>
          <button className="relative inline-flex w-full flex-1 items-center justify-center gap-x-1.5 rounded-lg bg-gradient p-4 text-sm font-semibold text-white hover:bg-gray-50 hover:bg-gradient-hover focus:z-10 disabled:bg-gradient-disabled sm:w-8/12">
            {selectDuration.name} - {formatMoney(selectDuration.amount)} sats - Buy now
          </button>
        </aside>
      </div>
    </div>
  )
}

export default BlockPartyPage
