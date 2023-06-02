'use client'

import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import styles from './index.module.css'

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

  // More questions...
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
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
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
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
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
