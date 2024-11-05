'use client'

import { useEffect, useState } from 'react'

import { Menu, Transition } from '@headlessui/react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { getOrders } from 'src/api/account/getOrders'
import AccountView from 'src/components/pages/account/AccountView'
import Link from 'src/components/shared/Link'
import { Loader, Table } from 'src/core'
import protect from 'src/hoc/protect'
import { useAccountContext } from 'src/providers/AccountProvider'
import { Order, OrderStatus, OrderType } from 'src/types'
import hasPassedOrderStatus from 'src/utils/hasPassedOrderStatus'
import { isOrderFulfilled } from 'utils'
import toast from 'react-hot-toast'

export function formatOrderStatus(order: Order) {
  switch (order.status) {
    case OrderStatus.Unpaid:
      return (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-900 ring-1 ring-inset ring-red-500/10">
          Unpaid
        </span>
      )
    case OrderStatus.Processing:
      return (
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-500/10">
          Processing
        </span>
      )
    case OrderStatus.PaymentOneComplete:
      if (order.type === OrderType.Auction) {
        return (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10">
            Paid
          </span>
        )
      }

      return (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10">
          Paid
        </span>
      )
    case OrderStatus.PaymentTwoComplete:
      return (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10">
          Paid
        </span>
      )
    case OrderStatus.EscrowCancelled:
      return (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-500/10">
          Cancelled
        </span>
      )
    case OrderStatus.DeliveryStarted:
      return (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-950 ring-1 ring-inset ring-green-500/10">
          Delivery Started
        </span>
      )
    case OrderStatus.DeliveryEnded:
      return (
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          Delivery ended
        </span>
      )
    case OrderStatus.EscrowRefunded:
      return <span className="font-normal text-blue-500">Refunded</span>
    default:
      return (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10">
          Paid
        </span>
      )
  }
}

function Orders() {
  const { token } = useAccountContext()

  const [loading, setLoading] = useState<boolean>(true)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const prepareOrders = async () => {
      if (!token) {
        return
      }

      setLoading(true)

      try {
        const res = await getOrders(token)

        setOrders(res)
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }

    prepareOrders()
  }, [token])

  return (
    <>
      <AccountView>
        {loading && (
          <div className="flex min-h-[30vh] items-center justify-center">
            <Loader />
          </div>
        )}
        {!loading && (
          <Table
            data={orders}
            cols={[
              { title: 'Order ID', name: 'order_id' },
              { title: 'Order Type', name: 'order_type' },
              { title: 'Name', name: 'name' },
              { title: 'Payment Status', name: 'payment_status' },
              { title: 'Actions', name: 'actions', align: 'right' },
            ]}
            row={(order, col) => {
              const hasManageAccess = hasPassedOrderStatus(order.status, OrderStatus.PaymentTwoComplete)

              switch (col) {
                case 'order_id': {
                  return <div className="flex h-12 items-center">{order.id}</div>
                }
                case 'order_type': {
                  return <div className="flex h-12 items-center">{order.type === OrderType.Direct ? 'Direct' : 'Auction'}</div>
                }
                case 'name': {
                  if (order.type === OrderType.Direct) {
                    return (
                      <Link
                        href={`/direct-order/success?order_id=${order.id}`}
                        target="_blank"
                        className="flex h-12 items-center text-blue-500 hover:underline"
                      >
                        <span>Instant Mining</span>{' '}
                        <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
                      </Link>
                    )
                  }

                  if (order.type === OrderType.BlockParty) {
                    return (
                      <Link href={''} target="_blank" className="flex h-12 items-center text-blue-500 hover:underline">
                        <span>Block Party - {order.block_party.name}</span>
                      </Link>
                    )
                  }

                  return (
                    <Link href={`/auctions/${order.auction?.slug}`} className="flex h-12 items-center text-blue-500 hover:underline">
                      {order.auction?.title}
                    </Link>
                  )
                }
                case 'payment_status': {
                  return <>{formatOrderStatus(order)}</>
                }
                case 'actions': {
                  return (
                    <div className="flex h-full items-center justify-end">
                      <OrderAction order={order} hasManageAccess={hasManageAccess} />
                    </div>
                  )
                }
              }
            }}
            empty={() => <span className="text-sm text-gray-500">No orders found</span>}
          />
        )}
      </AccountView>
    </>
  )
}

export default protect(Orders)

function OrderAction({ order, hasManageAccess }: { order: Order; hasManageAccess: boolean }) {
  const router = useRouter()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center text-gray-900 hover:text-gray-400 ">
          <span>View</span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
            {({ active }) => (
              <div>
                {!isOrderFulfilled(order.status) ? (
                  order.type === OrderType.Direct ? (
                    <span
                      onClick={() => toast.error("This option is unsupported, please create a new instant mining order")}
                      className={clsx(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer')}
                    >
                      Pay
                    </span>
                  ) : (
                    <Link
                      href={`/checkout/${order.id}`}
                      className={clsx(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
                    >
                      Pay
                    </Link>
                  )
                ) : hasManageAccess ? (
                  <Link
                    href={`/order/${order.id}`}
                    className={clsx(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
                  >
                    Manage
                  </Link>
                ) : (
                  <span className="text-sm text-gray-500">-</span>
                )}
              </div>
            )}
            </Menu.Item>
            {(order.type === OrderType.Auction || order.type === OrderType.Direct) && (
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={() => router.push(`/account/orders/${order.id}`)}
                    className={clsx(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
                  >
                    View Details
                  </span>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
