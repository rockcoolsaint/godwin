'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const excludedRoutes = ['login', 'register']

export default function useReturnUrl(excludeKey = false) {
  const pathName = usePathname()
  const pathData = pathName.split('/').filter(p => p)
  const [returnUrl, setReturnUrl] = useState<string | undefined>(undefined)
  const [hasExistingReturnUrl, setHasExistingReturnUrl] = useState<boolean>(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const currentReturnUrl = queryParams.get('return_url')

    if (currentReturnUrl) {
      setReturnUrl(currentReturnUrl)
      setHasExistingReturnUrl(true)
    } else {
      setReturnUrl(encodeURIComponent(pathName))
    }
  }, [pathName])

  const p = pathData[0]
  const isExcludedRoute = excludedRoutes.indexOf(p) !== -1

  if (!p || (isExcludedRoute && !hasExistingReturnUrl)) {
    return ''
  }

  if (excludeKey) {
    return returnUrl
  }

  return `?return_url=${returnUrl}`
}
