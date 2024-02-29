import { OrderStatus } from 'src/types'

const fulfilledStatuses = [
  OrderStatus.PaymentTwoComplete,
  OrderStatus.DeliveryStarted,
  OrderStatus.DeliveryEnded,
  OrderStatus.PaymentOneComplete,
]

export default function isOrderFulfilled(status: OrderStatus) {
  return fulfilledStatuses.indexOf(status) !== -1
}
