'use client'
import { Auction } from 'src/api/auction/types'
import ContentContainer from 'src/components/shared/ContentContainer'
import { useTranslation } from 'src/hooks'
import AuctionCard from 'src/components/pages/home/AuctionCard'

interface Props {
  auction: Auction[]
}

export default function CollectionList({ auction }: Props) {
  const { t } = useTranslation()

  return (
    <ContentContainer className=" capitalize" title={t('common.auctions')}>
      <ul className="mt-20 grid grid-cols-3 space-y-4 ">
        {auction.map((auction, index) => (
          <AuctionCard key={`activity-card-${index}`} auction={auction} />
        ))}
      </ul>
    </ContentContainer>
  )
}
