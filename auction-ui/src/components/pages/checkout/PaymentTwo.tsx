'use client'

import { Order } from 'src/types'
import { Button, Container, formatAuctionType, QR } from 'src/core'
import { formatMoney } from 'src/utils/currency'
import { ClipboardDocumentCheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

function PaymentTwo({ order }: { order: Order }) {
  const amount_remaining = order.total
  const payment_url = `bitcoin:${order.payment_address}?amount=${amount_remaining / 10 ** 8}`
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = () => {
    setCopied(true)
    navigator.clipboard.writeText(payment_url)
    toast.success('Copied to clipboard')
  }

  useEffect(() => {
    let t: NodeJS.Timeout
    if (copied) {
      t = setTimeout(() => {
        setCopied(false)
      }, 3000)
    }

    return () => {
      t && clearTimeout(t)
    }
  }, [copied])

  return (
    <Container className="!px-0 py-12">
      <section className="lg:w-5/5 mx-auto my-28 w-full min-w-min max-w-3xl">
        <h1 className="mb-2 flex items-center text-sm uppercase text-dark-200">Checkout - Remaining balance</h1>

        <div className="flex flex-col items-start justify-start gap-4 rounded-2xl bg-gray-100 p-5 lg:flex-row lg:items-end">
          <QR code={payment_url} />
          <div className="ml-0 flex flex-col justify-end sm:mt-0">
            <span>Payment address:</span>
            <div className="flex items-center ">
              <code className="mr-2 w-52 truncate sm:w-auto">{order.payment_address}</code>
              {copied ? (
                <ClipboardDocumentCheckIcon className="h-6 w-6" />
              ) : (
                <ClipboardDocumentIcon onClick={handleCopyAddress} className="h-6 w-6 hover:cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 rounded-2xl border border-gray-200 p-4 md:p-9">
          <div>
            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Your bid: </dt>
                <dd className="text-right text-sm font-medium text-gray-900">{formatMoney(order.price)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>
                    Mining deposit ({formatAuctionType(order.auction!.auction_type.type)} {order.auction?.auction_type.percentage}%):
                  </span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{formatMoney(order.mining_deposit)} sats</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Auction fee (3.5%): </span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{formatMoney(order.auction_fee)} sats</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Balance: </span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{formatMoney(order.total)} sats</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Total: </span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formatMoney(order.total + order.mining_deposit + order.auction_fee)} sats
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-green-500">
                <dt className="flex text-sm ">
                  <span>Paid: </span>
                </dt>
                <dd className="text-sm font-medium ">{formatMoney(order.mining_deposit + order.auction_fee)} sats</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-red-500">
                <dt className="flex text-sm ">
                  <span>Amount due: </span>
                </dt>
                <dd className="text-sm font-medium ">{formatMoney(amount_remaining)} sats</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-4 flex justify-end ">
          <a href={payment_url} target="_blank" rel="noreferrer">
            <Button>Checkout</Button>
          </a>
        </div>
      </section>
    </Container>
  )
}
export default PaymentTwo
