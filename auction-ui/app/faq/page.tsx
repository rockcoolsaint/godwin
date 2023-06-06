'use client'

import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import styles from './index.module.css'
import clsx from 'clsx'

const faqs = [
  {
    title: 'Auction',
    data: [
      {
        question: 'How do I bid?',
        answer: `
            <div>

            <p>There are 2 ways to bid: "normal" and "proxy" bidding</p>

            <ul>
                <li>To place a normal bid: enter your bid above the current bid, by the minimum increment (1,000 sats)</li>
                <li>To place a proxy bid: enter the <b>maximum</b> amount you will pay</li>
            </ul>

            <p>When you place a normal bid, you will likely be immediately outbid if there is an open proxy bid.</p>

            <p>When you place a proxy bid, you'll see bids placed automatically (up to your limit) as the auction moves forward.</p>
            </div>
        `,
      },
      {
        question: "How can I tell if I'm the current bidder?",
        answer: `
            <div>

            <p>You will see <b>(You)</b> listed next to the current bid.</p>

            </div>
        `,
      },
      {
        question: 'Who is "Anon"?',
        answer: `
            <div>

            <p>All bids are anonymous on Rigly, so all bids (other than yours) will say <b>Anon.</b></p>

            </div>
        `,
      },
    ],
  },
  {
    title: 'Bitcoin Mining',
    data: [
      {
        question: 'Why should I rent a bitcoin rig?',
        answer:
          '<p>Bitcoin mining rigs are expensive, special purpose machines. Current mining rigs are several thousand dollars. Rig rentals offer a lower price and better value.</p><p>In the early days of bitcoin, everyone who ran the original bitcoin software also mined to help secure the network. In those initial days, only a few thousand computers made up the whole network - <strong>1 cpu was 1 vote on the network’s consensus</strong>, as Satoshi wrote in the white paper. If that were the case today, malicious actors would be able to easily perform a 51% attack.</p><p>Today, bitcoin is secured by millions of mining rigs - millions of votes on consensus - and it is likely that even more mining is critical to ensure security as bitcoin grows.</p><p>New mining facilities in areas with low mining presence, such as South America or Africa, will also be available for rental on Rigly. Your choice to rent these rigs enables a better balance of the global hash rate.</p><p>And ultimately, mining allows you to earn new bitcoin and be a part of the bitcoin community!</p>',
      },
      {
        question: 'How do I monitor my rig?',
        answer: '<p>Your machines have 24/7 monitoring and can be watched in real-time from your account dashboard.</p>',
      },
      {
        question: 'Which mining pools are supported by Rigly?',
        answer:
          '<p>We suggest you use a PPS or FPPS pools for consistent rewards. Many Rigly users use <a href="https://braiins.com/pool">Braiins pool</a> or&nbsp;<a href="https://mining.luxor.tech/">Luxor pool.</a></p>',
      },
      {
        question: 'How often will I see bitcoin earned from my mining?',
        answer: `
          <div><p>Payout times will vary by mining pool. See your pool for details.</p>
<p>Many pools offer a minimum payout amount of 0.001 BTC.</p></div>`,
      },
      {
        question: 'How often will I see bitcoin earned from my mining?',
        answer: `
          <div><p>Payout times will vary by mining pool. See your pool for details.</p>
<p>Many pools offer a minimum payout amount of 0.001 BTC.</p></div>`,
      },
      {
        question: 'Do you offer mining auctions for other coins besides bitcoin?',
        answer: `
          <div><p>Rigly is bitcoin only.</p></div>`,
      },
      {
        question: 'Is bitcoin mining hashrate a security?',
        answer: `
            <p>The output of mining rigs (hashrate) is <span style="text-decoration: underline;">not</span> a security. Rigly's mining subscriptions are tied to real-world ASIC mining rigs listed by mining farms around the world. These rigs produce hashes per your configuration and you are in control of how your hashrate is utilized.</p>  
        `,
      },
      {
        question: 'Will I earn a profit from my mining?',
        answer: `
            <p>Your mining profitability depends upon a number of factors: future mining difficulty, hashprice, transaction fees and more. Mining profits will vary based on pool payout method.</p>  
        `,
      },
    ],
  },
  {
    title: 'Mining Plans',
    data: [
      {
        question: 'Is electricity cost included in the price?',
        answer: `<p>Yes. Your mining hashrate price includes all electricity and hosting facility costs.</p>`,
      },
      {
        question: "Why would someone rent out their bitcoin rigs? Isn't bitcoin mining profitable?",
        answer: `<p>No one knows where mining difficulty and hashprice will be in the future. Rigly offers a way for bitcoin miners to potentially earn more from their hashrate, over the long term, than they would by mining themselves.</p>`,
      },
      {
        question: 'What fees does Rigly charge?',
        answer: `<p>Our auction platform fee is 3% and is paid by the buyer. The fee is paid via hashrate. During your mining term, you will see a periodic drop in received hashrate when the fee is paid.</p>`,
      },
      {
        question: 'Are mining plans paid in USD or BTC?',
        answer: `<p>All payments are in bitcoin (BTC) based on the transaction price in bitcoin.</p>`,
      },
    ],
  },
  {
    title: 'Payment And Deposits',
    data: [
      {
        question: 'What happens if my mining rig goes offline?',
        answer: `<p>If your plan's ASIC mining rigs fail to perform within the Service Level Agreement or go offline for an extended period of time, you receive an extension or a refund based on the percentage downtime.</p>`,
      },
      {
        question: 'What if I change my mind? Can I get a refund?',
        answer: `<p>If your mining experiences an outage, is below the speed average/day, or otherwise fails to deliver, you will receive a refund based on the TH/s you should have received. However, Rigly is not able to refund if you change your mind or otherwise want to cancel your mining.</p>`,
      },
      {
        question: 'Is this cloud mining?',
        answer: `<p>Rigly is not cloud mining. All our mining plan listings are backed by real machines. Your mining fee is held in escrow while hashrate is delivered.</p>`,
      },
    ],
  },
]

export default function Example() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-4x mx-auto">
          <h1 className="mb-5 text-center text-4xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h1>
          <dl className="mt-10 space-y-6 ">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-10">
                <h1>{faq.title}</h1>
                {faq.data.map((faq, idx) => (
                  <Disclosure as="div" key={idx} className="pt-6">
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button
                            className={clsx(
                              'flex w-full items-start justify-between p-4 text-left text-gray-900 hover:bg-blue-100',
                              open ? 'bg-blue-200' : '',
                            )}
                          >
                            <span className="text-base font-semibold leading-7">{faq.question}</span>
                            <span className="ml-6 flex h-7 items-center">
                              {open ? (
                                <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                              ) : (
                                <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="bg-slate-100 p-4 pr-12">
                          <div
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                            className={`${styles['faq_body']} text-base leading-7 text-gray-600`}
                          />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
