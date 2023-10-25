import { OrderStatus } from 'src/types'

const statuses = [
  OrderStatus.Unpaid,
  OrderStatus.Processing,
  OrderStatus.PaymentOneComplete,
  OrderStatus.PaymentTwoComplete,
  OrderStatus.DeliveryStarted,
  OrderStatus.DeliveryEnded,
  OrderStatus.EscrowReview,
  OrderStatus.EscrowCancelled,
  OrderStatus.EscrowReleased,
]

export default function hasPassedOrderStatus(a: OrderStatus, b: OrderStatus) {
  const indexA = statuses.indexOf(a)
  const indexB = statuses.indexOf(b)

  return indexA >= indexB
}
