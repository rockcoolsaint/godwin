import Container from 'src/core/components/Container'

export default function RefundPolicy() {
  return (
    <Container className="my-24">
      <div className="mb-14">
        <div className="relative isolate overflow-hidden bg-gradient px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Refund Policy</h2>
        </div>
      </div>
      <div className="text-gray-700">
        <p className="mb-4 text-base">
          Rigly charges fees for transactions and related services. You agree that you will pay for all transactions and services entered.
          All transactions, including all subscription mining services from marketplace sellers, are final and non-refundable except per the
          terms under &ldquo;Failure to deliver&ldquo;. In the event a subscription mining service fails to deliver hashrate, a partial or
          full refund will be provided. Rigly determines this refund on a case by case basis.
        </p>

        <p>Rigly reserves the right to cancel any transaction or other service at any time.</p>

        <h2 className="my-4 text-2xl">Failure to deliver hashrate</h2>
        <p>
          ASIC mining rigs listed on Rigly are configured to perform compute activity. This activity is called &ldquo;hashrate&ldquo;. The
          output of the hashrate is sent to servers monitored but not owned nor maintained by Rigly. If Rigly detects hashrate delivery
          performance below threshold, as defined in the rental agreement, an extension of subscription time may be issued to the customer.
          In the event no hashrate is delivered, a full refund may be issued to the customer. The amount of refund is determined on a case
          by case basis based on monitoring data.
        </p>
      </div>
    </Container>
  )
}
