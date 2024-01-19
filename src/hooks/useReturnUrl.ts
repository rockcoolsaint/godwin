'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const excludedRoutes = ['login', 'register']

export default function useReturnUrl(config: { excludeKey: boolean; encode: boolean } = { excludeKey: false, encode: true }) {
  const pathName = usePathname()
  const pathData = pathName.split('/').filter(p => p)
  const [returnUrl, setReturnUrl] = useState<string | undefined>(undefined)
  const [hasExistingReturnUrl, setHasExistingReturnUrl] = useState<boolean>(false)
  const [query, setQuery] = useState<string | undefined>(undefined)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const currentReturnUrl = queryParams.get('return_url')
    const query = window.location.href.split('?')[1]
    if (query) {
      setQuery(query)
    }

    if (currentReturnUrl) {
      setReturnUrl(currentReturnUrl)
      setHasExistingReturnUrl(true)
    } else {
      setReturnUrl(encodeURIComponent(pathName))
    }
  }, [pathName])

  const p = pathData[0]
  const isExcludedRoute = excludedRoutes.indexOf(p) !== -1

  if (!returnUrl || !p || (isExcludedRoute && !hasExistingReturnUrl)) {
    return ''
  }

  const result = config.encode ? encodeURIComponent(returnUrl) : returnUrl

  if (config.excludeKey && query) {
    return `${result}${query ? `?${query}` : ''}`
  }

  if (config.excludeKey) {
    return result
  }

  return `?return_url=${result}`
}
