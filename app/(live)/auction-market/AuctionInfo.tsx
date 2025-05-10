'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Input from 'src/core/components/Input'
import { useAccountContext } from 'src/providers/AccountProvider'
import * as yup from 'yup'
import { LocalStorageKeys } from 'src/constants/localStorage'
import Arusha from 'src/images/arusha.png'
import Isla from 'src/images/isla.png'

export default function AuctionInfo() {
  const { account } = useAccountContext()
  const isLoggedIn = Boolean(account?.email)
  const [email, setEmail] = useState('')
  const router = useRouter()
  const [showTeamMembers, setShowTeamMembers] = useState({
    bitcoinisla: false,
    bitcoinarusha: false
  })

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
    <div className="flex flex-col items-center gap-4 pb-4 px-4">
      <h1 className="font-chakra text-2xl font-bold text-[#f08222] lg:text-5xl text-center">Block Party Hashathon</h1>
      
      {/* Teams Section */}
      <div className="mt-8 w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Team Arusha */}
          <div className="bg-[#fff5eb] rounded-lg shadow p-4 w-full sm:w-[200px]">
            <div className="flex flex-col items-center gap-2">
              <a href="https://x.com/btcarusha" target="_blank" rel="noopener noreferrer">
                <Image 
                  src={Arusha} 
                  alt="Bitcoin Arusha Logo" 
                  width={80} 
                  height={80} 
                  objectFit="contain" 
                />
              </a>
              <div className="text-center">
                <h4 className="text-lg font-semibold">Team Arusha</h4>
                <p className="text-sm font-bold text-[#f08222]">
                  Bitcoin Circular Economy in Tanzania
                </p>
              </div>
            </div>
          </div>
  
          {/* Team Isla */}
          <div className="bg-[#fff5eb] rounded-lg shadow p-4 w-full sm:w-[200px]">
            <div className="flex flex-col items-center gap-2">
              <a href="https://x.com/btcisla" target="_blank" rel="noopener noreferrer">
                <Image 
                  src={Isla} 
                  alt="Bitcoin Isla Logo" 
                  width={80} 
                  height={80} 
                  objectFit="contain" 
                />
              </a>
              <div className="text-center">
                <h4 className="text-lg font-semibold">Team Isla</h4>
                <p className="text-sm font-bold text-[#f08222]">
                  Bitcoin Circular Economy in Mexico
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Description Box */}
      <div className="flex justify-center w-full">
        <div className="bg-white rounded-lg shadow p-4 w-full sm:w-[300px] mt-6">
          <div className="flex flex-col gap-2 text-center">
            <div className="font-bold mb-2 text-xl">Pick your team and bid on hashrate</div>
            <div className="mt-4 space-y-2 text-gray-600">Team with the most hash wins</div>
            <div className="text-green-600 text-lg">1st Prize: 21 PH/s</div>
            <div className="text-blue-600 text-lg">2nd Prize: 5 PH/s</div>
            
            <div className="mt-4 space-y-2 text-gray-600">
              <div>Hashrate is sold at auction</div>
              <div>We mine solo, together on CK Pool</div>
              <div><b>High bid bonus</b></div>
              <div>Bid high to earn bonus hashrate <u>with 21% match</u> to benefit all Hashathon miners!</div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Pick Team Button */}
      <button
        onClick={() => router.push('/account/general')}
        className="mt-6 bg-[#f08222] text-white px-6 py-2 rounded-lg hover:bg-[#d67420] transition-colors"
      >
        Pick your team
      </button>
    </div>
  )
}