export default function formatAuctionType(auctionType: string) {
  switch (auctionType) {
    case 'immediate_delivery':
      return 'Immediate delivery'
    case 'forward_date':
      return 'Forward date'
    case 'upfront_payment':
      return 'Upfront payment'
  }
}
