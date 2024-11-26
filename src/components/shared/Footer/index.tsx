'use client'

import Link from 'src/components/shared/Link'
import { ArrowLongRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Logo from 'src/assets/webp/upendo-logo-orange.webp'
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
        <div className="w-12/12 mb-8 flex flex-wrap items-start justify-between border-t border-gray-300 pt-16">
          <div className="mb-4 flex items-center sm:mb-0">
            <Image 
              src={Logo}
              alt="Upendo Logo"
              priority // If this is your main logo, you'll want to prioritize loading
              width={200} // Set this to 50% of your original logo width
              height={60} // Set this to 50% of your original logo height
              className="w-auto h-auto" // This ensures the image scales properly
            />
            <div className="ml-3 border-l pl-3">
              <span className="block text-dark-200/[.7]">Bitcoin Mining</span>
              <span className="block text-dark-200/[.7]">Block Party Auction</span>
            </div>
          </div>
          <div className="flex w-fit flex-wrap items-center justify-start sm:mt-0 md:justify-end">
            <div className="w-12/12 mb-2 flex">
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
          </div>
        </div>
        <div className="mt-16 flex items-center justify-center border-t border-gray-300 py-7 ">
          <p>
            Contact: <Link href="mailto:evan@evanbaer.com" styled>Evan</Link> ~ Mining and infrastructure provided by <Link href="https://rigly.io" styled>Rigly</Link>. 
          </p>
        </div>
      </section>
    </Container>
  )
}

export default Footer
