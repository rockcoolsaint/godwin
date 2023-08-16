'use client'

import protect from 'src/hoc/protect'
import { Tab } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import clsx from 'clsx'
import { useAccountContext } from 'src/providers/AccountProvider'
import { getOrderById } from 'src/api/account/getOrderById'
import { OrderDetail as OrderDetailType } from 'src/types'
import OrderDetail from 'src/components/pages/order/OrderDetail'
import { OrderInvoice } from 'src/components/pages/order/OrderInvoice'
import { OrderHashrate } from 'src/components/pages/order/OrderHashrate'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

function OrderIdPage({ params }: { params: { [key: string]: string | undefined } }) {
  const { token } = useAccountContext()
  const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>(null)
  const router = useRouter()

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
    <div className="py-4">
      <h1 className="flex items-center px-8">
        <ArrowLeftCircleIcon onClick={() => router.back()} className="h-8 w-8 text-gray-500 hover:cursor-pointer" />
        <span className="ml-2 text-gray-600">Order {orderDetail?.order.id}</span>
      </h1>
      <Tab.Group>
        <Tab.List className="flex px-8 py-4">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={clsx(
                  selected ? 'text-black-700 bg-indigo-100' : 'text-gray-500 hover:text-gray-700',
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
                  selected ? 'text-black-700 bg-indigo-100' : 'text-gray-500 hover:text-gray-700',
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
                  selected ? 'text-black-700 bg-indigo-100' : 'text-gray-500 hover:text-gray-700',
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
            {orderDetail && <OrderHashrate invoice={orderDetail?.invoice} shares={orderDetail.shares} />}
          </Tab.Panel>
          <Tab.Panel className="px-8">{orderDetail && <OrderInvoice invoice={orderDetail?.invoice} />}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default protect(OrderIdPage)
