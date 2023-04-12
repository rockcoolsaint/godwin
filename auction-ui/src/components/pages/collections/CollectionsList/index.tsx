'use client'

import { Auction } from 'src/api/auction/types'
import { useTranslation } from 'src/hooks'
import AuctionCard from 'src/components/pages/home/AuctionCard'
import { Container } from 'src/core'

interface Props {
  auction: Auction[]
}

export default function CollectionList({ auction }: Props) {
  const { t } = useTranslation()

  return (
    <Container className="h-full grow py-5">
      <h1 className="capitalize">{t('common.auctions')}</h1>
      <ul className="mt-20 grid grid-cols-3 space-y-4 ">
        {auction.map((auction, index) => (
          <AuctionCard key={`activity-card-${index}`} auction={auction} />
        ))}
      </ul>
    </Container>
  )
}
