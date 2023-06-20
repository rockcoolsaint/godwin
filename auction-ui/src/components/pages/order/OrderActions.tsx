'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

import { Account, AccountType } from 'src/api/auction/types'
import { Order, OrderStatus } from 'src/types'
import { release } from 'src/api/orders/escrow/release'
import { useAccountContext } from 'src/providers/AccountProvider'
import hasPassedOrderStatus from 'src/utils/hasPassedOrderStatus'
import CancelOrderModal from './CancelOrderModal'
import RefundOrderModal from './RefundOrderModal'
import { approve } from 'src/api/orders/escrow/approve'
import RejectOrderRequestModal from './RejectOrderRequestModal'

export default function OrderActions({ account, order, onRefresh }: { account: Account; order: Order; onRefresh: () => void }) {
  const { token, isLoading: tokenLoading } = useAccountContext()
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false)
  const [showRefundModal, setShowRefundModal] = useState<boolean>(false)
  const [showRejectOrderRequestModal, setShowRejectOrderRequestModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleCancel = () => {
    setShowCancelModal(true)
  }

  const handleRefund = () => {
    setShowRefundModal(true)
  }

  const handleReject = () => {
    setShowRejectOrderRequestModal(true)
  }

  const handleCloseModal = () => {
    setShowCancelModal(false)
    setShowRefundModal(false)
    setShowRejectOrderRequestModal(false)
    onRefresh()
  }

  const handleRelease = async () => {
    if (tokenLoading || !token) {
      return
    }

    try {
      setLoading(true)
      await release(order.id, token)
      onRefresh()
    } catch (ex: any) {
      toast.error(ex.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (tokenLoading || !token) {
      return
    }

    try {
      setLoading(true)
      await approve(order.id, token)
      onRefresh()
    } catch (ex: any) {
      toast.error(ex.message)
    } finally {
      setLoading(false)
    }
  }

  if (!order || !account) {
    return null
  }

  const hasRequestedRefund = account.type === AccountType.Buyer && order.previous_status === OrderStatus.EscrowRequestRefund
  const hasRequestedCancellation = account.type === AccountType.Seller && order.previous_status === OrderStatus.EscrowRequestCancel
  const hasRequestedRelease = account.type === AccountType.Seller && order.previous_status === OrderStatus.EscrowRequestRelease

  return (
    <>
      {hasRequestedCancellation &&
        [OrderStatus.PaymentTwoComplete, OrderStatus.DeliveryStarted, OrderStatus.DeliveryEnded].indexOf(order.status) !== -1 && (
          <div className="flex flex-col">
            <span className="font-semibold text-red-500">Your cancellation request was rejected</span>
            <span>
              <b>Reason:</b> {order.messages[order.messages.length - 1].content}
            </span>
          </div>
        )}
      {hasRequestedRelease && order.status === OrderStatus.DeliveryEnded && (
        <div className="flex flex-col">
          <span className="font-semibold text-red-500">Your release funds request was rejected</span>
          <span>
            <b>Reason:</b> {order.messages[order.messages.length - 1].content}
          </span>
        </div>
      )}
      {hasRequestedRefund && order.status === OrderStatus.DeliveryEnded && (
        <div className="flex flex-col">
          <span className="font-semibold text-red-500">Your release funds request was rejected</span>
          <span>
            <b>Reason:</b> {order.messages[order.messages.length - 1].content}
          </span>
        </div>
      )}
      {/* <Chat order={order} account={account} /> */}
      {hasPassedOrderStatus(order.status, OrderStatus.PaymentTwoComplete) && (
        <div className="my-6 flex items-center justify-between gap-4">
          {account.type === 'buyer' &&
            [
              OrderStatus.DeliveryEnded,
              OrderStatus.EscrowRequestCancel,
              OrderStatus.EscrowRequestRelease,
              OrderStatus.EscrowReleased,
            ].indexOf(order.status) !== -1 && (
              <button
                onClick={handleRefund}
                className="relative inline-flex flex-1 items-center justify-center gap-x-1.5 rounded-lg bg-white px-3 py-4 text-base font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                disabled={loading}
              >
                Request refund
              </button>
            )}
          {account.type === AccountType.Seller && order.status === OrderStatus.PaymentTwoComplete && (
            <button
              onClick={handleCancel}
              className="relative inline-flex flex-1 items-center justify-center gap-x-1.5 rounded-lg bg-white px-3 py-4 text-base font-normal text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              disabled={loading}
            >
              Cancel order
            </button>
          )}
          {account.type === AccountType.Seller && order.status === OrderStatus.DeliveryEnded && (
            <button
              onClick={handleRelease}
              className="relative inline-flex flex-1 items-center justify-center gap-x-1.5 rounded-lg bg-gradient px-3 py-4 text-base font-normal text-white hover:bg-gray-50 hover:bg-gradient-hover focus:z-10"
            >
              Release funds
            </button>
          )}
        </div>
      )}
      {account.is_staff &&
        [OrderStatus.EscrowRequestRefund, OrderStatus.EscrowRequestCancel, OrderStatus.EscrowRequestRelease].indexOf(order.status) !==
          -1 && (
          <>
            <div className="mt-6 rounded-lg bg-gray-100 p-4">
              {order.status === OrderStatus.EscrowRequestRefund && (
                <span>
                  Buyer has requested a <span className="font-semibold text-blue-500">refund</span>, please either <b>Approve</b> or{' '}
                  <b>Reject</b> after completing the necessary actions on BitGo
                </span>
              )}
              {order.status === OrderStatus.EscrowRequestCancel && (
                <span>
                  Seller has requested <span className="font-semibold text-red-500">order cancellation</span>, please either <b>Approve</b>{' '}
                  or or <b>Reject</b> after completing the necessary actions on BitGo
                </span>
              )}
              {order.status === OrderStatus.EscrowRequestRelease && (
                <span>
                  Seller has requested a <span className="font-semibold text-green-500">payout</span>, please either <b>Approve</b> or{' '}
                  <b>Reject</b> after completing the necessary actions on BitGo
                </span>
              )}
            </div>
            <div className="my-6 flex items-center justify-between gap-4">
              <button
                onClick={handleApprove}
                className="relative inline-flex flex-1 items-center justify-center gap-x-1.5 rounded-lg bg-gradient px-3 py-4 text-base font-normal text-white hover:bg-gradient-hover"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="relative inline-flex flex-1 items-center justify-center gap-x-1.5 rounded-lg bg-red-500 px-3 py-4 text-base font-normal text-white hover:bg-red-400"
              >
                Reject
              </button>
            </div>
          </>
        )}

      <CancelOrderModal open={showCancelModal} onClose={handleCloseModal} order={order} account={account} />
      <RefundOrderModal open={showRefundModal} onClose={handleCloseModal} order={order} account={account} />
      <RejectOrderRequestModal open={showRejectOrderRequestModal} onClose={handleCloseModal} order={order} account={account} />
    </>
  )
}
