import clsx from 'clsx'
import QuoteSvg from 'src/assets/svg/quote.svg'
import Gradient from 'src/components/shared/Gradient'
import { useTranslation } from 'src/hooks'
import { Tweet } from 'react-twitter-widgets'
import { useState } from 'react'

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
        <section className="mt-8">
          <div className="columns-2xs gap-8 space-y-8">
            <div className="aspect-w-16 aspect-h-9 relative">
              <div>
                <figure className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>
                      It was a lot easier than I thought and helped me quickly understand the basics of mining. Easy and fast way to start
                      messing around with the mining and understanding the basics. Rigly has huge potential to get more mining online
                      throughout the world
                    </p>
                  </blockquote>
                  <div className="mt-4 flex items-center justify-between border-t">
                    <figcaption className="mt-6 flex items-center gap-x-4 ">
                      <div>
                        <div className="font-semibold">Matt Kolbinsky</div>
                        <div className="text-gray-600">Customer</div>
                      </div>
                    </figcaption>
                    <QuoteSvg className="relative top-2 block" />
                  </div>
                </figure>
              </div>
            </div>
            <div className="aspect-w-1 aspect-h-1 relative">
              <div>
                <figure className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>
                      Rigly is a perfect way to dip my toes in to the world of bitcoin mining without the need to commit to an expensive
                      mining rig upfront. It feels great to support the network and earn bitcoin rewards
                    </p>
                  </blockquote>
                  <div className="mt-4 flex items-center justify-between border-t">
                    <figcaption className="mt-6 flex items-center gap-x-4 ">
                      <div>
                        <div className="font-semibold">Tyler T.</div>
                        <div className="text-gray-600">Customer</div>
                      </div>
                    </figcaption>
                    <QuoteSvg className="relative top-2 block" />
                  </div>
                </figure>
              </div>
            </div>
            <div className="aspect-w-16 aspect-h-9 relative">
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
            </div>
            <div className="aspect-w-1 aspect-h-1 relative ">
              <div>
                <figure className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>
                      Hey, signed up for the 500 sat trial and now have a day of instant hash. Absolutely fantastic product and brilliantly
                      executed. Bravo 👏👌🧡
                    </p>
                  </blockquote>
                  <div className="mt-4 flex items-center justify-between border-t">
                    <figcaption className="mt-6 flex items-center gap-x-4 ">
                      <div>
                        <div className="font-semibold">Chris H</div>
                        <div className="text-gray-600">Customer</div>
                      </div>
                    </figcaption>
                    <QuoteSvg className="relative top-2 block" />
                  </div>
                </figure>
              </div>
            </div>
            <div
              className={clsx(
                'aspect-w-1 aspect-h-1 relative',
                tweetIsLoading && `h-[300px] w-[382] animate-pulse rounded-[12px] bg-gray-200`,
              )}
            >
              <div>
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
            </div>
            <div
              className={clsx(
                'aspect-w-1 aspect-h-1 relative',
                tweetIsLoading && `h-[300px] w-[382] animate-pulse rounded-[12px] bg-gray-200`,
              )}
            >
              <div>
                <Tweet
                  options={{
                    theme: 'light',
                    dnt: true,
                    align: 'center',
                    conversation: 'none',
                    cards: 'hidden',
                    height: '100%',
                  }}
                  key="1655412915740999680"
                  tweetId="1655412915740999680"
                  onLoad={() => setTweetIsLoading(false)}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
