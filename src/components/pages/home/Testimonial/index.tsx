import clsx from 'clsx'
import QuoteSvg from 'src/assets/svg/quote.svg'
import Gradient from 'src/components/shared/Gradient'
import { useTranslation } from 'src/hooks'
import { Tweet } from 'react-twitter-widgets'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Testimonial() {
  const { t } = useTranslation()
  const [tweetIsLoading, setTweetIsLoading] = useState(true)

  const { ref: tweet1Ref, inView: tweet1InView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  })

  const { ref: tweet2Ref, inView: tweet2InView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  })

  return (
    <div className="relative isolate bg-white pb-32 pt-24 sm:pt-32">
      <Gradient />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="gradient-text text-5xl font-semibold leading-relaxed tracking-tight sm:text-7xl">{t('home.testimonials')}</h2>
        </div>
        <section className="mt-8">
          <div className="columns-2xs gap-8 space-y-8">
            <div className="aspect-w-16 aspect-h-9 relative" ref={tweet1Ref}>
              {tweet1InView ? (
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
              ) : (
                <div className="h-[300px] w-[382] animate-pulse rounded-[12px] bg-gray-200" />
              )}
            </div>
            <div className="aspect-w-1 aspect-h-1 relative">
              <div>
                <figure className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>
                      Hey, signed up for the 500 sat trial and now have a day of instant hash. Absolutely fantastic product and brilliantly
                      executed. Bravo 👏👌🧡
                    </p>
                  </blockquote>
                  <div className="mt-4 flex items-center justify-between border-t">
                    <figcaption className="mt-6 flex items-center gap-x-4">
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
              ref={tweet2Ref}
            >
              {tweet2InView ? (
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
              ) : (
                <div className="h-[300px] w-[382] animate-pulse rounded-[12px] bg-gray-200" />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
