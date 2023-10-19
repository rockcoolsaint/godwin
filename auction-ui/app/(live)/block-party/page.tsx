'use client'
import { Fragment, useState } from 'react'
import { Listbox, Tab, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { formatMoney } from 'src/utils/currency'
import Image from 'next/image'
import chart from 'src/assets/png/chart.png'

const DURATION = [
  { name: 'Small', value: 21, amount: 5500 },
  { name: 'Medium', value: 100, amount: 10500 },
  { name: 'Large', value: 210, amount: 20500 },
]

function BlockPartyPage() {
  const [currentTab, setCurrentTab] = useState(0)
  const [selectDuration, setSelectDuration] = useState(DURATION[0])

  const handleSelectDuration = (val: any) => {
    setSelectDuration(val)
  }

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
              <Details />
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white p-3">
              <Buyers />
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white p-3">
              <Onchain />
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

function Details() {
  return (
    <div>
      <Image className="mb-4 block w-full overflow-hidden sm:h-64" src={chart} width={352} height={230} alt="chart" />
      <h3 className="text-center">21 PH/s</h3>
    </div>
  )
}

const people = [
  { name: 'Anonymous 101', speed: '21 TH/s', time: '2 days ago' },
  { name: 'Pieman', speed: '210 TH/s', time: '5 hours ago' },
  { name: 'Kevin', speed: '21 TH/s', time: '2 hours ago' },
  { name: 'Nico', speed: '100 TH/s', time: '30 mins ago' },
  { name: 'Evan', speed: '21 TH/s', time: '45 secs ago' },
  // More people...
]

function Buyers() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Speed
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {people.map(person => (
                  <tr key={person.time} className="even:bg-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{person.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.speed}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const people2 = [
  {
    name: 'Pending Balance',
    email: 'michael.foster@example.com',
    role: '0',
    imageUrl: '',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Escrow Balance',
    email: 'dries.vincent@example.com',
    role: '0',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
  },
  {
    name: 'Escrow Address',
    email: 'lindsay.walton@example.com',
    role: '1GVY5eZvtc5bA6EFEGnpqJeHUC5YaV5dsb',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Host',
    email: 'courtney.henry@example.com',
    role: 'Kevin',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
]

function Onchain() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {people2.map(person => (
        <li key={person.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{person.role}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
