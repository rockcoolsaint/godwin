'use client'

import { Account, AccountType } from 'src/api/auction/types'
import { Order, OrderStatus } from 'src/types'

export default function OrderStatusMessage({ account, order }: { account: Account; order: Order }) {
  if (!order || !account) {
    return null
  }

  const cancellationReason =
    order.status === OrderStatus.EscrowCancelled && account.type === AccountType.Seller
      ? order.messages.filter(message => message.sender === 'seller')[0].content
      : undefined

  return (
    <>
      {order.status === OrderStatus.PaymentTwoComplete && (
        <div className="my-6 flex items-center justify-center rounded-lg bg-blue-100 p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-center font-semibold text-blue-500">
              Payment completed in full, waiting for hashrate delivery to start
            </span>
          </div>
        </div>
      )}
      {account.type === AccountType.Buyer && [OrderStatus.DeliveryEnded, OrderStatus.EscrowReleased].indexOf(order.status) !== -1 && (
        <div className="my-6 flex items-center justify-center rounded-lg bg-green-100 p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-center font-semibold text-green-500">Seller has completed the hashrate delivery</span>
            <span className="text-center">If you dispute this, you can request a refund below.</span>
          </div>
        </div>
      )}
      {account.type === AccountType.Seller && order.status === OrderStatus.DeliveryEnded && (
        <div className="my-6 flex items-center justify-center rounded-lg bg-green-100 p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-center font-semibold text-green-500">Your hashrate has been delivered</span>
          </div>
        </div>
      )}
      {order.status === OrderStatus.DeliveryStarted && (
        <div className="my-6 flex items-center justify-center rounded-lg bg-blue-100 p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-center font-semibold text-blue-500">Your hashrate is being delivered</span>
            <span className="text-center">Please wait for the delivery to complete.</span>
          </div>
        </div>
      )}
      {[OrderStatus.EscrowRequestRefund, OrderStatus.EscrowRequestCancel, OrderStatus.EscrowRequestRelease].indexOf(order.status) !==
        -1 && (
        <div className="my-6 flex items-center justify-center rounded-lg bg-blue-100 p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-center font-semibold text-blue-500">Your order is being reviewed</span>
            <span className="text-center">Please wait until review has been completed.</span>
          </div>
        </div>
      )}
      {order.status === OrderStatus.EscrowCancelled && (
        <div className="my-6 flex items-center justify-center rounded-lg bg-red-100 p-4">
          <div className="flex flex-col items-center gap-2">
            {account.type === AccountType.Buyer && (
              <span className="text-center font-semibold text-red-500">Order has been cancelled by seller</span>
            )}
            {account.type === AccountType.Seller && (
              <span className="text-center font-semibold text-red-500">You have cancelled the order</span>
            )}
            <span className="text-center">
              <b>Reason:</b> {cancellationReason || 'Unknown reason'}
            </span>
          </div>
        </div>
      )}
      {account.type === AccountType.Seller && order.status === OrderStatus.EscrowReleased && (
        <div className="my-6 flex items-center justify-center rounded-lg bg-green-100 p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-center font-semibold text-green-500">Your payout has been approved</span>
            <span className="text-center">Please wait for the funds to arrive in your wallet.</span>
          </div>
        </div>
      )}
      {account.type === AccountType.Buyer && order.status === OrderStatus.EscrowRefunded && (
        <div className="my-6 flex items-center justify-center rounded-lg bg-green-100 p-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-center font-semibold text-green-500">Your refund request has been approved</span>
            <span className="text-center">Please wait for the funds to arrive in your wallet.</span>
          </div>
        </div>
      )}
    </>
  )
}
