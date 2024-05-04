import Image, { StaticImageData } from 'next/image'

interface TextWithImageProps {
  text: string
  image: StaticImageData
  imageAlt: string
  imageSize?: number
}

const TextWithImageLeft = ({ text, image, imageAlt, imageSize = 300 }: TextWithImageProps) => (
  <section className="my-6 flex w-full flex-col items-center md:flex-row md:items-center">
    <div className="flex flex-1 items-center justify-center px-4 md:px-6 md:pr-4">
      <div className="relative mb-5 h-auto w-full max-w-full md:mb-0 md:max-w-[300px]">
        <Image src={image} alt={imageAlt} width={imageSize || image.width} objectFit="contain" className="mx-auto" />
      </div>
    </div>
    <div className="flex flex-1 items-center px-4 md:px-4 md:pr-0">
      <p className="text-justify" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  </section>
)

export default TextWithImageLeft
