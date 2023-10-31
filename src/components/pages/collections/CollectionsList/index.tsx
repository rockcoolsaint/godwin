'use client'

import { Auction } from 'src/api/auction/types'
import { useTranslation } from 'src/hooks'
import AuctionCard from 'src/components/pages/home/AuctionCard'
import { Container } from 'src/core'
import { ListBulletIcon, ViewColumnsIcon, FaceFrownIcon } from '@heroicons/react/24/outline'
import AuctionList from 'src/components/pages/home/AuctionList'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { LocalStorageKeys } from 'src/constants/localStorage'
import { createUrl } from 'utils'
import { usePathname, useSearchParams } from 'next/navigation'
import MoreAuctions from 'src/components/shared/MoreAuctions'

interface Props {
  auction: Auction[]
  count: number
}

export default function CollectionList({ auction, count }: Props) {
  const { t } = useTranslation()
  type ViewTypes = 'list' | 'card'
  const [viewType, setViewType] = useState<ViewTypes | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sortBy = searchParams.get('sort')
  const auctionType = searchParams.get('auction_type')
  const next = searchParams.get('next')

  const newParams = new URLSearchParams()
  newParams.append('next', next ? (Number(next) + 1).toString() : `1`)
  if (auctionType) {
    newParams.append('auction_type', auctionType)
  }
  if (sortBy) {
    newParams.append('sort', sortBy)
  }

  useEffect(() => {
    const view = (window.localStorage.getItem(LocalStorageKeys.Auction.auctionView) as ViewTypes) || 'card'

    setViewType(view)
  }, [viewType])

  const renderCollectionsHeader = () => {
    return (
      <div className="mb-4 flex items-center justify-between">
        <h1 className="capitalize">{t('common.auctions')}</h1>
        <div className="flex items-center">
          <ViewColumnsIcon
            onClick={() => {
              setViewType('card')
              window.localStorage.setItem(LocalStorageKeys.Auction.auctionView, 'card')
            }}
            className={clsx(
              'mr-2 h-8 w-8 cursor-pointer rounded-sm border border-gray-400 p-1 hover:bg-gray-400',
              viewType === 'card' ? 'bg-gray-400' : '',
            )}
          />
          <ListBulletIcon
            onClick={() => {
              setViewType('list')
              window.localStorage.setItem(LocalStorageKeys.Auction.auctionView, 'list')
            }}
            className={clsx(
              'h-8 w-8 cursor-pointer rounded-sm border border-gray-400 p-1 hover:bg-gray-400',
              viewType === 'list' ? 'bg-gray-400' : '',
            )}
          />
        </div>
      </div>
    )
  }

  const renderView = () => {
    if (!auction || auction.length === 0) {
      return (
        <Container className="flex h-screen flex-col items-center justify-center py-20">
          <FaceFrownIcon className="h-24 w-24 font-extralight text-gray-500" />
          <span className="text-xl text-gray-500">No auctions available</span>
        </Container>
      )
    }

    return (
      <>
        {viewType === 'card' && (
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 ">
            {auction.map((auction, index) => (
              <AuctionCard key={`activity-card-${index}`} auction={auction} />
            ))}
          </ul>
        )}
        {viewType === 'list' && (
          <>
            {auction.map((auction, index) => (
              <AuctionList key={`activity-card-${index}`} auction={auction} />
            ))}
          </>
        )}
      </>
    )
  }

  const showMorePath = count > auction?.length ? createUrl('', newParams) : false

  return (
    <Container className="!mx-0 mb-20 !w-full grow md:w-full xl:mx-auto">
      <div className="flex min-h-screen flex-col">
        {renderCollectionsHeader()}
        {renderView()}
        {showMorePath && (
          <div className="">
            <MoreAuctions path={showMorePath} />
          </div>
        )}
      </div>
    </Container>
  )
}
