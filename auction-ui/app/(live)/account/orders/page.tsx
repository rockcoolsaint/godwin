'use client'

import { useEffect, useState } from 'react'

import AccountView from 'src/components/pages/account/AccountView'
import Link from 'src/components/shared/Link'
import { getOrders } from 'src/api/account/getOrders'
import { Order, OrderStatus, OrderType, Payment } from 'src/types'
import { Loader, Table } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'
import protect from 'src/hoc/protect'
import { isOrderFulfilled } from 'utils'
import hasPassedOrderStatus from 'src/utils/hasPassedOrderStatus'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'

import Modal from 'src/core/components/Modal'
import { formatMoney } from 'src/utils/currency'
import SatsSvg from 'src/assets/svg/sats.svg'

function formatOrderStatus(status: string) {
  switch (status) {
    case OrderStatus.Unpaid:
      return <span className="font-semibold text-red-600">Unpaid</span>
    case OrderStatus.Processing:
      return <span className="font-semibold text-gray-600">Processing</span>
    case OrderStatus.PaymentOneComplete:
      return <span className="font-semibold text-orange-400">Deposit & fee received</span>
    case OrderStatus.Paid:
      return <span className="font-semibold text-green-400">Paid</span>
    default:
      return <span className="font-semibold text-green-600">Paid</span>
  }
}

function Orders() {
  const { token } = useAccountContext()

  const [loading, setLoading] = useState<boolean>(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)

  const handleCloseModal = () => {
    setShowPaymentModal(false)
  }

  const handleShowPaymentModal = (id: number) => {
    const filteredPayments = orders.filter(order => {
      return order.id === id
    })

    setPayments(filteredPayments[0].payments)
    setShowPaymentModal(true)
  }

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
              { title: 'Auction Name', name: 'name' },
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
                  return (
                    <Link href={`/auctions/${order.auction.slug}`} className="flex h-12 items-center text-blue-500 hover:underline">
                      {order.auction.title}
                    </Link>
                  )
                }
                case 'payment_status': {
                  return <>{formatOrderStatus(order.status)}</>
                }
                case 'actions': {
                  return (
                    <div className="flex h-full items-center justify-end">
                      <OrderAction order={order} hasManageAccess={hasManageAccess} handleShowPaymentModal={handleShowPaymentModal} />
                    </div>
                  )
                }
              }
            }}
            empty={() => <span className="text-sm text-gray-500">No orders found</span>}
          />
        )}
      </AccountView>
      <OrderPayments payments={payments} open={showPaymentModal} onClose={handleCloseModal} />
    </>
  )
}

export default protect(Orders)

export function OrderAction({
  order,
  hasManageAccess,
  handleShowPaymentModal,
}: {
  order: Order
  hasManageAccess: boolean
  handleShowPaymentModal: (id: number) => void
}) {
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
                    <Link
                      href={`/checkout/${order.id}`}
                      className={clsx(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
                    >
                      Pay
                    </Link>
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
            <Menu.Item>
              {({ active }) => (
                <span
                  onClick={() => handleShowPaymentModal(order.id)}
                  className={clsx(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
                >
                  View Payments
                </span>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export function OrderPayments({ payments, open, onClose }: { payments: Payment[]; open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} className="min-w-[420px]">
      <Modal.Header>
        <Modal.Title>Payments</Modal.Title>
        <Modal.Close />
      </Modal.Header>

      <Modal.Content className="w-full">
        <Table
          data={payments}
          cols={[
            { title: 'ID', name: 'id' },
            { title: 'Amount', name: 'amount' },
            { title: 'Provider', name: 'provider' },
            { title: 'Status', name: 'status' },
            { title: 'Tx ID', name: 'tx_id' },
          ]}
          row={(payment, col) => {
            switch (col) {
              case 'id': {
                return <div className="flex h-12 items-center">{payment.id}</div>
              }
              case 'amount': {
                return (
                  <div className="flex h-12 items-center">
                    {formatMoney(payment.amount)} <SatsSvg className="ml-2" />
                  </div>
                )
              }
              case 'provider': {
                return <div className="flex h-12 items-center">{payment.provider}</div>
              }
              case 'status': {
                return <div className="flex h-12 items-center">{formatOrderStatus(payment.status)}</div>
              }
              case 'tx_id': {
                return <div className="flex h-12 items-center">{payment.tx_id}</div>
              }
            }
          }}
          empty={() => <span className="text-sm text-gray-500">No payments recorded</span>}
        />
      </Modal.Content>
    </Modal>
  )
}
