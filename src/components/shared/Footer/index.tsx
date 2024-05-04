'use client'

import Link from 'src/components/shared/Link'
import { ArrowLongRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import LogoSvg from 'src/assets/svg/logo_dark.svg'
import NostrSvg from 'src/assets/svg/nostr.svg'
import Telegram from 'src/assets/svg/telegram.svg'
import TwitterSvg from 'src/assets/svg/twitter.svg'
import Container from 'src/core/components/Container'
import { useCallback, useState } from 'react'
import clsx from 'clsx'
import { subscribeNewsletter } from 'src/api/subscribe/subscribe'
import { Follow } from 'react-twitter-widgets'
import MiningSvg from 'src/assets/svg/mine.svg'
import { useInView } from 'react-intersection-observer'

const Footer = () => {
  const year = new Date().getFullYear()
  const [subscribe, setSubscribe] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const { ref: twitterFollowRef, inView: twitterFollowInView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  })

  const handleSubscribe = useCallback(async () => {
    setLoading(true)
    try {
      await subscribeNewsletter(email)
      setSubscribe(true)
      setEmail('')
      setLoading(false)

      setTimeout(() => {
        setSubscribe(false)
      }, 3000)
    } catch (error) {
      setLoading(false)
    }
  }, [email])

  const handleInputChange = (e: { target: { value: any } }) => {
    const { value } = e.target
    setEmail(value)
  }

  return (
    <Container className="max-w-7xl md:w-full">
      <section>
        <div className="w-12/12 mb-16 flex flex-wrap items-start justify-between border-t border-gray-300 pt-16">
          <div className="mb-4 flex items-center sm:mb-0">
            <LogoSvg />
            <div className="ml-3 border-l pl-3">
              <span className="block text-dark-200/[.7]">Bitcoin Mining</span>
              <span className="block text-dark-200/[.7]">Auctions</span>
            </div>
          </div>
          <div className="flex w-fit flex-wrap items-center justify-start sm:mt-0 md:justify-end">
            <div className="w-12/12 mb-4 flex">
              <Link
                className="block items-center justify-center rounded-lg bg-gray-100 p-3 hover:bg-gray-300/[.5]"
                href="https://t.me/+AEvub_E_9hNiYzAx"
                target="_blank"
              >
                <Telegram className="h-6 w-6" />
              </Link>
              <Link
                className="ml-2 block items-center justify-center rounded-lg bg-gray-100 p-3 hover:bg-gray-300/[.5]"
                href="https://primal.net/profile/npub1t6el40knsq8hmrpr0m6tt3t0tr4pdeyhlt2qelwhgtwawddqx0xsv03scu"
                target="_blank"
              >
                <NostrSvg className="h-6 w-6" />
              </Link>
              <Link
                target="_blank"
                className="ml-2 flex items-center justify-center rounded-lg bg-gray-100 p-3 hover:bg-gray-300/[.5]"
                href="https://x.com/TrustlessMining"
              >
                <TwitterSvg className="h-6 w-6" />
              </Link>
            </div>
            <div className="flex w-10/12 justify-start md:justify-end" ref={twitterFollowRef}>
              {twitterFollowInView && <Follow username="trustlessmining" options={{ dnt: true, showCount: false }} />}
            </div>
          </div>
        </div>
        <div className="flex grid-cols-5 flex-col gap-4 md:grid">
          <div>
            <div>
              <h4 className="mb-5 text-lg font-medium text-dark-200">Contact</h4>
              <ul>
                <li className="mb-3">
                  <Link className="font-normal text-dark-100 hover:underline" href="mailto:hello@rigly.io">
                    hello@rigly.io
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="quicklink">
              <h4 className="mb-5 text-lg font-medium text-dark-200">Quick Link</h4>
              <ul>
                <li className="mb-3">
                  <Link className="font-normal text-dark-100 hover:underline" href="/trustless-mining">
                    Trustless Mining Escrow
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="font-normal text-dark-100 hover:underline" href="/about-us">
                    About us
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="font-normal text-dark-100 hover:underline" href="mailto:hello@rigly.io">
                    Contact us
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="font-normal text-dark-100 hover:underline" href="/learn-more">
                    Learn
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="flex items-center font-normal text-dark-100 hover:underline" href="/selling-on-rigly">
                    <span>List your mining</span>
                    <MiningSvg className="ml-2 text-dark-100" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="quicklink">
              <h4 className="mb-5 text-lg font-medium text-dark-200">Support</h4>
              <ul>
                <li className="mb-3">
                  <Link className="font-normal text-dark-100 hover:underline" href="/register">
                    Create Account
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="font-normal text-dark-100 hover:underline" href="/privacy-policy">
                    Privacy policy
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="font-normal text-dark-100 hover:underline" href="/tos">
                    Terms & Conditions
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="font-normal text-dark-100 hover:underline" href="/faq">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-2 ">
            <div className="subscribe-bx">
              <h4 className="mb-5 text-lg font-medium text-dark-200">Sign up for updates</h4>
              <div className="flex">
                <div className="w-full">
                  <input
                    type="email"
                    name=""
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="h-input-tall w-full rounded-lg border px-4 placeholder:text-dark-100 focus:border-gradient focus:ring-0"
                    value={email}
                  />
                </div>
                <button
                  className={clsx(
                    'ml-2 flex items-center justify-center rounded-lg  px-4 text-white ',
                    loading ? '!bg-gray-400' : 'bg-gradient hover:bg-gradient-hover',
                  )}
                  type="submit"
                  onClick={handleSubscribe}
                >
                  <span>Send</span>
                  <ArrowLongRightIcon className="ml-2 h-5 w-5" />
                </button>
              </div>
              {subscribe && (
                <p className="mt-3 flex items-center text-sm text-gray-600">
                  <CheckCircleIcon className="mr-1 h-5 w-5 text-green-600" /> Thanks for subscribing
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-center border-t border-gray-300 py-7 ">
          <p>
            &copy; Copyright {year} <span className="text-primary">Rigly</span>. All Rights Reserved.
          </p>
        </div>
      </section>
    </Container>
  )
}

export default Footer
