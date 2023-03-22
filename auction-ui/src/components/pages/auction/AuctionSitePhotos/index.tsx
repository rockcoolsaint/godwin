import Image from 'next/image'
import sitePhoto from 'src/assets/png/site_photo.png'

export default function AuctionSitePhotos() {
  return (
    <div className="h-full">
      <Image className="h-full w-full" alt="Auction live feed" src={sitePhoto} width={500} height={500} />
    </div>
  )
}
