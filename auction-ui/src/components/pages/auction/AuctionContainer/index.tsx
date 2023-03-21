'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function handleSelect({ selected }: { selected: boolean }) {
  return classNames(
    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-dark-100',
    ' ring-offset-blue-400 ',
    selected ? 'bg-gradient !text-white' : 'text-dark-100 hover:bg-white/[0.52] hover:text-dark-100',
  )
}
export default function AuctionContainer() {
  const [categories] = useState({
    Bids: [
      {
        id: 1,
        title: 'Bids',
      },
    ],
    Profile: [
      {
        id: 2,
        title: 'Profile',
      },
    ],
    'Live feed': [
      {
        id: 3,
        title: 'Live feed',
      },
    ],
    Calculator: [
      {
        id: 4,
        title: 'Calculator',
      },
    ],
    'Hash price': [
      {
        id: 5,
        title: 'Hash price',
      },
    ],
    'Site photos': [
      {
        id: 6,
        title: 'Site photos',
      },
    ],
  })

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              )}
            >
              <ul>
                {posts.map(post => (
                  <li key={post.id} className="relative rounded-md p-3 hover:bg-gray-100">
                    <h3 className="text-sm font-medium leading-5">{post.title}</h3>
                    <a
                      href="#"
                      className={classNames('absolute inset-0 rounded-md', 'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2')}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map(category => (
            <Tab key={category} className={handleSelect}>
              {category}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  )
}
