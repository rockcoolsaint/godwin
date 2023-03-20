import { Order, Payment, PaymentStatus } from 'src/types'

function getAmountRemaining(payments: Payment[]) {
  if (payments.length === 0) {
    return 0
  }

  if (payments.length === 1) {
    const first = payments[0]

    return first.status === PaymentStatus.Paid ? 0 : first.amount
  }

  const last = payments[payments.length - 1]

  return last.status === PaymentStatus.Paid ? 0 : last.amount
}

function getAmountPaid(payments: Payment[]) {
  if (payments.length === 0) {
    return 0
  }

  if (payments.length === 1) {
    const first = payments[0]

    return first.status === PaymentStatus.Paid ? first.amount : 0
  }

  const first = payments[0]
  const last = payments[payments.length - 1]

  const s = first.promo_code ? first.amount : first.original_amount

  return last.status === PaymentStatus.Paid ? s : s - last.amount
}

function getFeesPaid(order: Order) {
  if (!order.payments) {
    return false
  }

  const first = order.payments[0]
  const feesTotal = order.mining_deposit + order.auction_fee

  if (!first) {
    return 0
  }

  if (first.status === PaymentStatus.Processing) {
    return false
  }

  if (order.payments.length === 1) {
    return feesTotal <= first.amount
  }

  const last = order.payments[order.payments.length - 1]
  const paid = first.original_amount - last.amount

  return feesTotal <= paid
}

export default function usePayments(order?: Order) {
  if (!order || !order.payments) {
    return {}
  }

  const { payments } = order

  const first = payments.length > 0 ? payments[0] : undefined
  const last = payments.length > 1 ? payments[payments.length - 1] : undefined

  const amountPaid = getAmountPaid(payments)
  const amountRemaining = getAmountRemaining(payments)
  const feesPaid = getFeesPaid(order)

  const isPaymentComplete = last ? last.status === PaymentStatus.Paid : first ? first.status === PaymentStatus.Paid : false

  const checkoutUrl = last ? last.checkout_url : first ? first.checkout_url : undefined

  const paymentId = last ? last.payment_id : first ? first.payment_id : undefined

  const auctionFee = order.auction_fee
  const miningDeposit = order.mining_deposit

  return {
    first,
    last,
    auctionFee,
    miningDeposit,
    feesPaid,
    amountPaid,
    amountRemaining,
    isPaymentComplete,
    paymentId,
    checkoutUrl,
  }
}
