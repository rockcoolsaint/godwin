/* eslint-disable react/jsx-no-bind */
'use client'

import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'

const auth0 = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '',
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
  redirectUri: process.env.NEXT_PUBLIC_AUTH0_LOGIN_REDIRECT_URL || '',
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // TODO: Needed to make build succeed, but causes hydration error in runtime.
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return <>{children}</>
  }

  const handleRedirectCallback = () => {
    // TODO: Do something with redirect callback hit
  }

  return (
    <Auth0Provider
      domain={auth0.domain}
      clientId={auth0.clientId}
      useCookiesForTransactions={true}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: auth0.redirectUri,
      }}
      onRedirectCallback={handleRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
