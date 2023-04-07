'use client'

import { useEffect, useState } from 'react'

import { Loader } from 'src/core'
import AccountView from 'src/components/pages/account/AccountView'
import { useAccountContext } from 'src/providers/AccountProvider'

export default function HashrateDetail() {
  const { token } = useAccountContext()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(false)
  }, [token])

  return (
    <AccountView>
      <div className="flex min-h-[30vh] items-center justify-center">
        {loading && <Loader />}
        {!loading && <span>Auction detail view</span>}
      </div>
    </AccountView>
  )
}
