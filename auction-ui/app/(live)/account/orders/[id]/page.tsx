'use client'

import protect from 'src/hoc/protect'
import { Tab } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import clsx from 'clsx'
import { useAccountContext } from 'src/providers/AccountProvider'
import { getOrderById } from 'src/api/account/getOrderById'
import { Order } from 'src/types'

function OrderIdPage({ params }: { params: { [key: string]: string | undefined } }) {
  const { token } = useAccountContext()
  const [order, setOrder] = useState<Order | null>(null)

  const { id } = params

  useEffect(() => {
    const getOrderDetails = async () => {
      if (!token) {
        return
      }
      try {
        const res = await getOrderById(token, id)
        setOrder(res)
      } catch (ex) {
        console.error(ex)
      }
    }

    getOrderDetails()
  }, [id, token])

  return (
    <div>
      <h1>Order ID</h1>
      <OrderTabs />
    </div>
  )
}

export default protect(OrderIdPage)

function OrderTabs() {
  return (
    <Tab.Group>
      <Tab.List className="flex py-8">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={clsx(
                selected ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                'rounded-md px-3 py-2 text-sm font-medium outline-none',
              )}
            >
              Order
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={clsx(
                selected ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                'rounded-md px-3 py-2 text-sm font-medium outline-none',
              )}
            >
              Hashrate
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={clsx(
                selected ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                'rounded-md px-3 py-2 text-sm font-medium outline-none',
              )}
            >
              Invoice
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Order Details</Tab.Panel>
        <Tab.Panel>Order Hashrate</Tab.Panel>
        <Tab.Panel>Order Invoice</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
