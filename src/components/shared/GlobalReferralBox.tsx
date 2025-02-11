// src/components/shared/GlobalReferralBox.tsx
'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAccountContext } from 'src/providers/AccountProvider'
import { ClipboardIcon, CheckIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { Tooltip, TooltipContent, TooltipTrigger } from 'src/components/shared/Tooltip'
import Link from 'src/components/shared/Link'

const GlobalReferralBox = () => {
  const { account, token } = useAccountContext()
  const [copied, setCopied] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  
  if (!token || !account) {
    return null
  }
  
  const encodedReferralCode = encodeURIComponent(account.referral_code)
  const signupUrl = `https://upendo.rigly.io/register?referral=${encodedReferralCode}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(signupUrl)
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="w-full rounded-xl bg-white shadow-lg border border-gray-200 mb-4">
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={toggleMinimize}>
        <h2 className="text-lg font-bold">Grow our Block Party!</h2>
        <div className="flex items-center gap-2">
          {isMinimized ? (
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronUpIcon className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      
      {!isMinimized && (
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-600 mb-4">
            New bidders improve our odds. Tell your friends.
          </p>

          {/* Commenting out referral code section
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div>
              <span className="text-sm text-gray-600 block mb-1">Your referral code:</span>
              <span className="font-mono font-bold">{account.referral_code}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 text-orange-600 hover:text-orange-700"
            >
              {copied ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <ClipboardIcon className="h-5 w-5" />
              )}
              <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          */}
          
        </div>
      )}
    </div>
  )
}

export default GlobalReferralBox
