'use client'

import { AllAuctionsResponse, Auction } from 'src/api/auction/types'
import { useTranslation } from 'src/hooks'
import AuctionCard from 'src/components/pages/home/AuctionCard'
import { Container } from 'src/core'
import { ListBulletIcon, ViewColumnsIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import AuctionList from 'src/components/pages/home/AuctionList'
import { useState } from 'react'
import clsx from 'clsx'
import { LocalStorageKeys } from 'src/constants/localStorage'
import CollectionsFilter from 'src/components/pages/collections/CollectionsFilter'

interface Props {
  auction: Auction[]
  setAuctions: (auctions: AllAuctionsResponse) => void
  setLoading?: (loading: boolean) => void
}

export default function CollectionList({ auction, setAuctions, setLoading }: Props) {
  const { t } = useTranslation()
  type ViewTypes = 'list' | 'card'
  const view = (localStorage.getItem(LocalStorageKeys.Auction.auctionView) as ViewTypes) || 'card'
  const [viewType, setViewType] = useState<ViewTypes | null>(view)
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <Container className="mb-20 h-full grow py-5 ">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="capitalize">{t('common.auctions')}</h1>
        <div className="flex items-center">
          <AdjustmentsHorizontalIcon
            onClick={() => setShowModal(true)}
            className="mr-2 h-8 w-8 cursor-pointer rounded-sm border border-gray-400 p-1 hover:bg-gray-400"
          />
          <ViewColumnsIcon
            onClick={() => {
              setViewType('card')
              localStorage.setItem(LocalStorageKeys.Auction.auctionView, 'card')
            }}
            className={clsx(
              'mr-2 h-8 w-8 cursor-pointer rounded-sm border border-gray-400 p-1 hover:bg-gray-400',
              viewType === 'card' ? 'bg-gray-400' : '',
            )}
          />
          <ListBulletIcon
            onClick={() => {
              setViewType('list')
              localStorage.setItem(LocalStorageKeys.Auction.auctionView, 'list')
            }}
            className={clsx(
              'h-8 w-8 cursor-pointer rounded-sm border border-gray-400 p-1 hover:bg-gray-400',
              viewType === 'list' ? 'bg-gray-400' : '',
            )}
          />
        </div>
      </div>
      {viewType === 'card' && (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
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
      <CollectionsFilter setAuctions={setAuctions} showModal={showModal} setShowModal={setShowModal} setLoading={setLoading} />
    </Container>
  )
}
