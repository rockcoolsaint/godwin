import { Order } from 'src/types'
import { Button, Container, QR } from 'src/core'

function PaymentTwo({ order }: { order: Order }) {
  const amount_remaining = order.total - order.mining_deposit - order.auction_fee
  const payment_url = `bitcoin:${order.auction.payment_address}?amount=${amount_remaining}`

  return (
    <Container>
      <h1>Checkout page</h1>
      <h2>Remaining balance</h2>

      <QR code={payment_url} />
      <p>{order.auction.payment_address}</p>
      <p>{amount_remaining}</p>
      <a href={payment_url} target="_blank" rel="noreferrer" className="mt-4 block">
        <Button>Checkout</Button>
      </a>
    </Container>
  )
}
export default PaymentTwo
