import Image, { StaticImageData } from 'next/image'

interface TextWithImageProps {
  text: string
  image: StaticImageData
  imageAlt: string
  imageSize?: number
}

const TextWithImageRight = ({ text, image, imageAlt, imageSize = 300 }: TextWithImageProps) => (
  <section className="my-6 flex w-full flex-col items-center md:flex-row">
    <div className="flex flex-1 items-center md:px-4 md:pl-0">
      <p className="text-justify" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
    <div className="flex flex-1 items-center justify-center px-4 md:ml-4 md:px-6">
      <div className="relative mt-5 h-auto w-full max-w-full md:mt-0 md:max-w-[300px]">
        <Image src={image} alt={imageAlt} width={imageSize || image.width} objectFit="contain" className="mx-auto" />
      </div>
    </div>
  </section>
)

export default TextWithImageRight
