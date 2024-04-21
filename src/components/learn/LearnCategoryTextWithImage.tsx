import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface LearnCategoryTextWithImageProps {
  text: string
  image: StaticImageData
  imageAlt: string
  imagePosition?: 'left' | 'right'
}

const LearnCategoryTextWithImage: React.FC<LearnCategoryTextWithImageProps> = ({ text, image, imageAlt, imagePosition = 'right' }) => (
  <section className={`my-6 flex flex-col items-center md:flex-row`}>
    {imagePosition === 'left' && (
      <div className="mb-6 flex justify-start md:mr-4 md:w-1/2">
        <Image src={image} alt={imageAlt} width={300} height={300} objectFit="cover" />
      </div>
    )}
    <p className={`mx-auto max-w-2xl text-justify leading-relaxed md:mr-4 md:w-1/2`}>{text}</p>
    {imagePosition === 'right' && (
      <div className="mt-6 flex justify-end md:ml-4 md:w-1/2">
        <Image src={image} alt={imageAlt} width={300} height={300} objectFit="cover" />
      </div>
    )}
  </section>
)

export default LearnCategoryTextWithImage
