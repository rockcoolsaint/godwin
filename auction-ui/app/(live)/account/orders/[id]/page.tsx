'use client'

import protect from 'src/hoc/protect'
import { Tab } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import clsx from 'clsx'
import { useAccountContext } from 'src/providers/AccountProvider'
import { getOrderById } from 'src/api/account/getOrderById'
import { Order, OrderDetail as OrderDetailType } from 'src/types'
import SatsSvg from 'src/assets/svg/sats.svg'
import OrderDetail from 'src/components/pages/order/OrderDetail'

function OrderIdPage({ params }: { params: { [key: string]: string | undefined } }) {
  const { token } = useAccountContext()
  const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>(null)

  const { id } = params

  useEffect(() => {
    const getOrderDetails = async () => {
      if (!token) {
        return
      }
      try {
        const res = await getOrderById(token, id)
        setOrderDetail(res)
      } catch (ex) {
        console.error(ex)
      }
    }

    getOrderDetails()
  }, [id, token])

  return (
    <div>
      <h1>Order ID</h1>
      <Tab.Group>
        <Tab.List className="flex px-8 py-4">
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
          <Tab.Panel className="px-8">{orderDetail && <OrderDetail order={orderDetail?.order} />}</Tab.Panel>
          <Tab.Panel className="px-8">
            <OrderHashrate order={orderDetail?.order} />
          </Tab.Panel>
          <Tab.Panel className="px-8">
            <OrderInvoice order={orderDetail?.order} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default protect(OrderIdPage)

export function OrderHashrate({ order }: { order: Order }) {
  return <h1>Order Hash rate</h1>
}

export function OrderInvoice({ order }: { order: Order }) {
  return <h1>Order Hash rate</h1>
}
