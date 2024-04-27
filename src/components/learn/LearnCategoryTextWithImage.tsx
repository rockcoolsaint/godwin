import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface LearnCategoryTextWithImageProps {
  text: string
  image: StaticImageData
  imageAlt: string
  imagePosition?: 'left' | 'right' | 'top'
  imageSize?: number
}

const LearnCategoryTextWithImage: React.FC<LearnCategoryTextWithImageProps> = ({
  text,
  image,
  imageAlt,
  imagePosition = 'right',
  imageSize = 300,
}) => {
  const flexDirection = imagePosition === 'top' ? 'flex-col items-center' : 'flex-col md:flex-row items-center'
  const imageMargin = imagePosition === 'top' ? 'mb-6' : 'mb-6 md:mb-0'
  const textMargin = imagePosition === 'top' ? 'mt-0' : 'mt-6 md:mt-0'
  const imageOrder = imagePosition === 'right' ? 'md:order-2' : 'md:order-1'
  const textOrder = imagePosition === 'right' ? 'md:order-1' : 'md:order-2'
  const imagePadding = imagePosition === 'top' ? '' : 'md:px-4'
  const textWidth = imagePosition === 'top' ? 'w-full' : 'md:w-1/2'

  return (
    <section className={`my-6 flex ${flexDirection}`}>
      <div className={`${imageMargin} md:w-1/2 ${imageOrder} ${imagePadding}`}>
        <div className="relative mx-auto md:mx-0" style={{ width: `${imageSize}px`, height: `${imageSize}px` }}>
          <Image src={image} alt={imageAlt} layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className={`${textMargin} ${textWidth} ${textOrder} ${imagePadding}`}>
        <p className="text-justify leading-relaxed">{text}</p>
      </div>
    </section>
  )
}

export default LearnCategoryTextWithImage
