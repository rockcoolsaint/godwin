'use client'

import { useEffect, useState } from 'react'
import { getBids } from 'src/api/account/getBids'
import AccountView from 'src/components/pages/account/AccountView'
import Link from 'src/components/shared/Link'
import { Loader, Table } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'
import { formatMoney } from 'src/utils/currency'

function ActiveBidsPage() {
  const { token } = useAccountContext()

  const [loading, setLoading] = useState<boolean>(true)
  const [activeBids, setActiveBids] = useState<any[]>([])

  useEffect(() => {
    const prepareOrders = async () => {
      if (!token) {
        return
      }

      setLoading(true)

      try {
        const res = await getBids(token)
        setActiveBids(res)
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }

    prepareOrders()
  }, [token])

  return (
    <AccountView>
      {loading && (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <Table
          data={activeBids?.bids}
          cols={[
            { title: 'Auction', name: 'auction' },
            { title: 'Latest bid', name: 'auction_bid' },
            { title: 'My bid', name: 'my_bid' },
          ]}
          row={(bids, col) => {
            switch (col) {
              case 'auction': {
                return (
                  <Link href={`/auctions/${bids.auction.slug}`} className="flex h-12 items-center text-blue-500 hover:underline">
                    {bids.auction.title}
                  </Link>
                )
              }

              case 'auction_bid': {
                return <div className="flex h-12 items-center">{formatMoney(bids.auction.current_bid)} sats</div>
              }
              case 'my_bid': {
                return <div className="flex h-12 items-center">{formatMoney(bids.bid)} sats</div>
              }
            }
          }}
          empty={() => <span className="text-sm text-gray-500">No active bids found</span>}
        />
      )}
    </AccountView>
  )
}

export default ActiveBidsPage
