'use client'
import { useState } from 'react'
import { Tab } from '@headlessui/react'

function BlockPartyPage() {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <div className="mx-auto flex max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
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
            <Tab.Panel className="rounded-xl bg-white p-3">
              <p>Overview content goes here.</p>
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white p-3">
              <p>Participants content goes here.</p>
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white p-3">
              <p>Transactions content goes here.</p>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div>
        <h1>Block Party</h1>
        <p>Happy White Papter Day!</p>
        <p>Solo mine with Rigly - Learn more</p>
        <aside>
          <div>
            <div>
              <p>Hashrate</p>
              <b>21 PH/s</b>
            </div>
            <div>
              <p>Hashprice</p>
              <b>250 sats per TH/s/day</b>
            </div>
            <div>
              <p>Duration</p>
              <b>24 hours - October 31 @ 00:00 UTC</b>
            </div>
          </div>
          <button>Small - 5,500 sats - Buy now</button>
        </aside>
      </div>
    </div>
  )
}

export default BlockPartyPage
