'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Input from 'src/core/components/Input'
import AuctionPlaceholder from 'src/assets/jpg/auctioneer_hashrate.jpg'
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

  return (
    <div className="flex flex-col items-center gap-4 pb-4">
      <h1 className="font-chakra text-2xl font-bold text-[#f08222] lg:text-5xl">Block Party Auction</h1>
      <div className="lg:items-star flex flex-col items-center gap-4 lg:flex-row">
        <div className="item-center flex flex-col gap-4 self-stretch">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 rounded-md border border-gray-400 p-1 text-left text-xs">
              <div>- We mine together on CK Pool to try and mine a block</div>
              <div>- Hashrate is sold at auction</div>
              <div>- Bonus hashrate after each auction improves the odds</div>
            </div>
          </div>
        </div>
        <Image className="border-gray-40 mb-4 rounded-md border" src={AuctionPlaceholder} alt="placeholder" height={300} />
      </div>
    </div>
  )
}
