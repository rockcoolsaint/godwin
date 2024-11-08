import React from 'react'
import Image from 'next/image'
import { StaticImageData } from 'next/image'

interface LearnCategoryImageWithCaptionProps {
  image: StaticImageData
  imageAlt: string
  text: string
  imageSize?: number
}

const LearnCategoryImageWithCaption: React.FC<LearnCategoryImageWithCaptionProps> = ({
  image,
  imageAlt,
  text,
  imageSize = 600
}) => (
  <section className="my-6 flex w-full flex-col items-center">
    <div className="relative w-full max-w-[800px]">
      <Image 
        src={image} 
        alt={imageAlt} 
        width={imageSize} 
        height={imageSize} 
        objectFit="contain" 
        className="mx-auto"
      />
    </div>
    <p className="mt-4 text-center text-sm text-gray-600 w-[50%] mx-auto">{text}</p>
  </section>
)

export default LearnCategoryImageWithCaption
