import Image from 'next/image'
import sitePhoto from 'src/assets/png/site_photo.png'

export default function AuctionSitePhotos() {
  return (
    <div className="flex h-full items-center justify-center">
      <Image className="w-3/4 object-cover" alt="Auction live feed" src={sitePhoto} width={500} height={500} />
    </div>
  )
}
