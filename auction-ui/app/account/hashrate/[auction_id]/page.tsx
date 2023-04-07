'use client'

import { useEffect, useState } from 'react'

import AccountView from 'src/components/pages/account/AccountView'
import { useAccount } from 'src/hooks'
import { Loader } from 'src/core'

export default function HashrateDetail() {
  const { token } = useAccount()

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(false)
  }, [token])

  return (
    <AccountView>
      {loading && (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && <>Auction detail view</>}
    </AccountView>
  )
}
