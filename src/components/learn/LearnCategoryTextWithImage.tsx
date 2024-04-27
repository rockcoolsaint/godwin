import React from 'react'
import { StaticImageData } from 'next/image'
import TextWithImageLeft from './TextWithImageLeft'
import TextWithImageRight from './TextWithImageRight'
import TextWithImageTop from './TextWithImageTop'

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
}) => (
  <>
    {imagePosition === 'left' && <TextWithImageLeft text={text} image={image} imageAlt={imageAlt} imageSize={imageSize} />}
    {imagePosition === 'right' && <TextWithImageRight text={text} image={image} imageAlt={imageAlt} imageSize={imageSize} />}
    {imagePosition === 'top' && <TextWithImageTop text={text} image={image} imageAlt={imageAlt} imageSize={imageSize} />}
  </>
)

export default LearnCategoryTextWithImage
