/* eslint-disable react/jsx-no-bind */
import { Order } from 'src/types'
import { Button, Container, formatAuctionType, QR } from 'src/core'

function PaymentTwo({ order }: { order: Order }) {
  const amount_remaining = order.total - order.mining_deposit - order.auction_fee
  const payment_url = `bitcoin:${order.payment_address}?amount=${amount_remaining / 10 ** 8}`

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(payment_url)
  }

  return (
    <Container>
      <h1>Checkout page</h1>
      <h2>Remaining balance</h2>

      <div className="mt-4 flex flex-col items-start gap-4">
        <QR code={payment_url} />
        <div className="flex items-center">
          <span className="mr-1">Payment address:</span>
          <b className="mr-2">{order.payment_address}</b>
          <button className="h-7 rounded bg-gradient px-2 hover:bg-gradient-hover" onClick={handleCopyAddress}>
            <span className="text-xs uppercase tracking-wide text-white">Copy</span>
          </button>
        </div>
      </div>
      <div>
        <span>Your bid: </span>
        <b>
          {order.price}
          <i className="fak fa-regular" />
        </b>
      </div>
      <div>
        <span>
          Mining deposit ({formatAuctionType(order.auction.auction_type.type)} {order.auction.auction_type.percentage}%):
        </span>{' '}
        <b>
          {order.mining_deposit}
          <i className="fak fa-regular" />
        </b>
      </div>
      <div>
        <span>Auction fee (3.5%): </span>
        <b>
          {order.auction_fee}
          <i className="fak fa-regular" />
        </b>
      </div>
      <div>
        <span>Total: </span>
        <b>{order.total}</b>
      </div>
      <div className="my-4 border-t border-gray-300" />
      <div>
        <span>Paid: </span>
        <b>
          {order.mining_deposit + order.auction_fee}
          <i className="fak fa-regular" />
        </b>
      </div>
      <div>
        <span>Amount due: </span>
        <b>
          {amount_remaining}
          <i className="fak fa-regular" />
        </b>
      </div>
      <a href={payment_url} target="_blank" rel="noreferrer" className="mt-4 block">
        <Button>Checkout</Button>
      </a>
    </Container>
  )
}
export default PaymentTwo
