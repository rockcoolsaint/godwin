import { OrderMessage } from 'src/types'

const SENDER = { buyer: 'Buyer', seller: 'Seller', system: 'System' }

export default function getOrderMessageSender(message: OrderMessage) {
  return SENDER[message.sender]
}
