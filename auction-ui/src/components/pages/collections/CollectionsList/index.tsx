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
    <Container className="my-20 h-full grow py-5 ">
      <h1 className="capitalize">{t('common.auctions')}</h1>
      <ul className="mt-10 grid grid-cols-1 items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {auction.map((auction, index) => (
          <AuctionCard key={`activity-card-${index}`} auction={auction} />
        ))}
      </ul>
    </Container>
  )
}
