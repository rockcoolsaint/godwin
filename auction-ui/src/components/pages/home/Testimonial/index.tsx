import clsx from 'clsx'
import QuoteSvg from 'src/assets/svg/quote.svg'
import Gradient from 'src/components/shared/Gradient'
import { useTranslation } from 'src/hooks'
import { Tweet } from 'react-twitter-widgets'
import { useState } from 'react'

const testimonials = [
  [
    [
      {
        body: 'Hey, signed up for the 500 sat trial and now have a day of instant hash. Absolutely fantastic product and brilliantly executed. Bravo 👏👌🧡 ',
        author: {
          name: 'Chris H',
          handle: 'Customer',
        },
      },
    ],
    [
      {
        body: 'It was a lot easier than I thought and helped me quickly understand the basics of mining.  Easy and fast way to start messing around with the mining and understanding the basics.  Rigly has huge potential to get more mining online throughout the world',
        author: {
          name: 'Matt Kolbinsky',
          handle: 'Customer',
        },
      },
    ],
    [
      {
        body: 'Rigly is a perfect way to dip my toes in to the world of bitcoin mining without the need to commit to an expensive mining rig upfront. It feels great to support the network and earn bitcoin rewards',
        author: {
          name: 'Tyler T.',
          handle: 'Customer',
        },
      },
    ],
  ],
]

export default function Testimonial() {
  const { t } = useTranslation()
  const [tweetIsLoading, setTweetIsLoading] = useState(true)

  return (
    <div className="relative isolate bg-white pb-32 pt-24 sm:pt-32">
      <Gradient />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="gradient-text text-5xl font-semibold leading-relaxed tracking-tight sm:text-7xl">{t('home.testimonials')}</h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-sm grid-cols-1 grid-rows-1 gap-x-8 text-sm leading-6 text-gray-900 sm:mt-20 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-3">
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div key={columnGroupIdx} className="space-y-6 xl:contents xl:space-y-0">
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={clsx(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-6',
                  )}
                >
                  {column.map(testimonial => (
                    <figure key={testimonial.author.handle} className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-900/5">
                      <blockquote className="text-gray-900">
                        <p>{testimonial.body}</p>
                      </blockquote>
                      <div className="mt-4 flex items-center justify-between border-t">
                        <figcaption className="mt-6 flex items-center gap-x-4 ">
                          <div>
                            <div className="font-semibold">{testimonial.author.name}</div>
                            <div className="text-gray-600">{testimonial.author.handle}</div>
                          </div>
                        </figcaption>
                        <QuoteSvg className="relative top-2 block" />
                      </div>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mx-auto mt-4 grid max-w-sm grid-cols-1 grid-rows-1 gap-x-8 text-sm leading-6  text-gray-900 sm:mt-4 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-3">
          <div className={clsx(tweetIsLoading && `h-[300px] w-[382] animate-pulse rounded-[12px] bg-gray-200`)}>
            <Tweet
              options={{
                theme: 'light',
                dnt: true,
                align: 'center',
                conversation: 'none',
                cards: 'hidden',
                height: '100%',
              }}
              key="1619087046244712448"
              tweetId="1619087046244712448"
              onLoad={() => setTweetIsLoading(false)}
            />
          </div>
          <div className={clsx(tweetIsLoading && `h-[300px] w-[382] animate-pulse rounded-[12px] bg-gray-200`)}>
            <Tweet
              options={{
                theme: 'light',
                dnt: true,
                align: 'center',
                conversation: 'none',
                cards: 'hidden',
                height: '100%',
              }}
              key="1642452515789885440"
              tweetId="1642452515789885440"
              onLoad={() => setTweetIsLoading(false)}
            />
          </div>
          <div className={clsx(tweetIsLoading && `h-[300px] w-[382] animate-pulse rounded-[12px] bg-gray-200`)}>
            <Tweet
              options={{
                theme: 'light',
                dnt: false,
                align: 'center',
                conversation: 'none',
                cards: 'hidden',
                height: '100%',
                chrome: 'nofooternoheader',
              }}
              key="1642525343473868800"
              tweetId="1642525343473868800"
              onLoad={() => setTweetIsLoading(false)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
