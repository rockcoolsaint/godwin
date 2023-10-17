'use client'

import { useEffect, useState } from 'react'
import { getBids } from 'src/api/account/getBids'
import AccountView from 'src/components/pages/account/AccountView'
import { Loader, Table } from 'src/core'
import { useAccountContext } from 'src/providers/AccountProvider'

interface Props {
  onClick: () => void
}

const ActiveBidsPage: React.FC<Props> = ({ onClick }) => {
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
        // console.log('bids is ', res)

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
          data={activeBids}
          cols={[
            { title: 'Auction ID', name: 'auction_id' },
            { title: 'Type', name: 'type' },
            { title: 'Bid Amount', name: 'bid' },
          ]}
          row={(bids, col) => {
            switch (col) {
              case 'auction_id': {
                return <div className="flex h-12 items-center">{bids.auction_id}</div>
              }
              case 'type': {
                return <div className="flex h-12 items-center">{bids.type}</div>
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
