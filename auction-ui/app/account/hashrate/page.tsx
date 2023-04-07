/* eslint-disable react/jsx-no-bind */
'use client'

import { useEffect, useState } from 'react'
import Link from 'src/components/shared/Link'
import Image from 'next/image'

import AccountView from 'src/components/pages/account/AccountView'
import { Loader, Table } from 'src/core'
import { getOrders } from 'src/api/account/getOrders'
import { Order, OrderStatus } from 'src/types'
import { useAccountContext } from 'src/providers/AccountProvider'
import protect from 'src/hoc/protect'

function Hashrate() {
  const { token } = useAccountContext()

  const [loading, setLoading] = useState<boolean>(true)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setLoading(false)
    const prepareOrders = async () => {
      if (!token) {
        return
      }

      setLoading(true)

      try {
        const res = await getOrders(token)

        setOrders(res.filter((o: Order) => o.status === OrderStatus.PaymentTwoComplete))
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
          data={orders}
          cols={[
            { title: 'Auction', name: 'auction' },
            { title: 'Hashrate', name: 'hashrate' },
            { title: 'ASIC model', name: 'asic_model' },
            { title: 'Power source', name: 'power_source' },
            { title: 'Days of mining', name: 'days_of_mining' },
            { title: 'Hours per day', name: 'hours_per_day' },
            { title: 'Actions', name: 'actions', align: 'right' },
          ]}
          row={(order, col) => {
            switch (col) {
              case 'auction': {
                return (
                  <Link href={`/auctions/${order.auction.slug}`} className="group flex items-center justify-start gap-4 py-1">
                    <div className="h-10 w-10 rounded-lg bg-gray-300">
                      {order.auction.auction_meta.site_photo && (
                        <Image src={order.auction.auction_meta.site_photo} alt={order.auction.title} />
                      )}
                    </div>
                    <span className="group-hover:text-primary">{order.auction.title}</span>
                  </Link>
                )
              }
              case 'hashrate': {
                return <>{order.auction.auction_meta.hashrate}</>
              }
              case 'asic_model': {
                return <>{order.auction.auction_meta.asic_model}</>
              }
              case 'power_source': {
                return <>{order.auction.auction_meta.power_source}</>
              }
              case 'days_of_mining': {
                return <>{order.auction.auction_meta.days_of_mining} days</>
              }
              case 'hours_per_day': {
                return <>{order.auction.auction_meta.hours_per_day} hours</>
              }
              case 'actions': {
                return (
                  <div className="flex h-full items-center justify-end">
                    <Link href={`/account/hashrate/${order.auction.id}`} className="text-sm text-blue-500 hover:text-blue-700">
                      Manage
                    </Link>
                  </div>
                )
              }
            }
          }}
          empty={() => <span className="text-sm text-gray-500">No auctions found</span>}
        />
      )}
    </AccountView>
  )
}

export default protect(Hashrate)
