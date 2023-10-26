'use client'
import { Account, AccountType } from 'src/api/auction/types'
import { Order } from 'src/types'
import getOrderMessageSender from 'src/utils/getOrderMessageSender'

export default function Chat({ order, account }: { order: Order; account: Account }) {
  if (order.messages.length === 0) {
    return null
  }

  const filteredMessages = order.messages.filter(message => {
    if (message.sender === 'system') {
      return true
    }

    return account.type === AccountType.Buyer ? message.sender === 'buyer' : message.sender === 'seller'
  })

  return (
    <div className="flex flex-col rounded-lg border border-gray-300">
      <div className="border-b border-gray-300 p-4">
        <span className="font-semibold">Chat</span>
      </div>
      <div className="flex flex-col py-4">
        {filteredMessages.map((message, i) => {
          const sender = getOrderMessageSender(message)

          return (
            <div key={i} className="px-4">
              <b>{sender}:</b> {message.content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
