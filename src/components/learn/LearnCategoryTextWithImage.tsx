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
  const flexDirection = imagePosition === 'top' ? 'flex-col' : 'md:flex-row'

  return (
    <section className={`my-6 flex ${flexDirection} items-center`}>
      {imagePosition === 'top' && (
        <div className="mb-6 flex justify-center ">
          <Image src={image} alt={imageAlt} width={imageSize} height={imageSize} objectFit="cover" />
        </div>
      )}
      {imagePosition === 'left' && (
        <div className="mb-6 flex justify-start md:mr-4 md:w-1/2">
          <Image src={image} alt={imageAlt} width={imageSize} height={imageSize} objectFit="cover" />
        </div>
      )}
      <p className={`mx-auto max-w-2xl text-justify leading-relaxed ${imagePosition !== 'top' ? 'md:mr-4 md:w-1/2' : ' mx-2'}`}>{text}</p>
      {imagePosition === 'right' && (
        <div className="mt-6 flex justify-end md:ml-4 md:w-1/2">
          <Image src={image} alt={imageAlt} width={imageSize} height={imageSize} objectFit="cover" />
        </div>
      )}
    </section>
  )
}

export default LearnCategoryTextWithImage
