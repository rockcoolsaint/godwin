import { OrderStatus } from 'src/types'

const fulfilledStatuses = [OrderStatus.PaymentTwoComplete, OrderStatus.DeliveryStarted, OrderStatus.DeliveryEnded]

export default function isOrderFulfilled(status: OrderStatus) {
  return fulfilledStatuses.indexOf(status) !== -1
}
