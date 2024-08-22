'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Input from 'src/core/components/Input'
import AuctionPlaceholder from 'src/assets/jpg/auction-placeholder.jpg'
import { useAccountContext } from 'src/providers/AccountProvider'
import * as yup from 'yup'
import { LocalStorageKeys } from 'src/constants/localStorage'

export default function AuctionInfo() {
  const { account } = useAccountContext()
  const isLoggedIn = Boolean(account?.email)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const emailValidationSchema = yup.object({
    email: yup.string().email().required(),
  })

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isValid = await emailValidationSchema.isValid({ email })

    if (isValid) {
      window.localStorage.setItem(LocalStorageKeys.Login.email, email)
      router.push('/register')
    } else {
      alert('Please enter a valid email.')
    }
  }

  if (isLoggedIn) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-4 pb-4">
      <h1 className="font-chakra text-2xl font-bold text-navy lg:text-5xl">Auctions</h1>
      <div className="lg:items-star flex flex-col items-center gap-4 lg:flex-row">
        <div className="item-center flex flex-col gap-4 self-stretch">
          <div className="flex flex-col gap-2">
            <div className="font-chakra text-lg text-navy lg:text-4xl">Live Daily Auctions</div>
            <div className="flex flex-col gap-2 rounded-md border border-gray-400 p-1 text-left text-xs">
              <div>- Bid Anonymously</div>
              <div>- Compete in live daily auctions from 9 to 4, M to F</div>
              <div>- Price determined by the market</div>
            </div>
          </div>
          <div>
            <form className="flex gap-2" onSubmit={handleFormSubmit}>
              <Input
                type="email"
                className="text-2xl"
                id="email"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button type="submit" className="rounded-md bg-blue-700 px-2 py-1 text-xs text-white">
                Start bidding
              </button>
            </form>
          </div>
        </div>
        <Image className="border-gray-40 mb-4 rounded-md border" src={AuctionPlaceholder} alt="placeholder" height={300} />
      </div>
    </div>
  )
}
