import React from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { IMiningPool, MINING_POOLS } from 'src/constants/pools'

interface Props {
  selectedPool: IMiningPool
  setSelectedPool: (val: IMiningPool) => void
}

export default function SelectPicker({ selectedPool, setSelectedPool }: Props) {
  return (
    <Listbox value={selectedPool} onChange={setSelectedPool}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
          <span className="block truncate">{selectedPool.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
        </Listbox.Button>
        <Transition as={React.Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {MINING_POOLS.map(pool => (
              <Listbox.Option
                key={pool.id}
                className={({ active }) =>
                  `${active ? 'bg-green-100 text-green-900' : 'text-gray-900'} relative cursor-default select-none py-2 pl-4 pr-4`
                }
                value={pool}
              >
                {({ selected, active }) => (
                  <>
                    <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>{pool.name}</span>
                    {selected ? (
                      <span
                        className={`${active ? 'text-green-600' : 'text-green-600'}
                                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                      ></span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
