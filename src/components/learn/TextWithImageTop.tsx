import Image, { StaticImageData } from 'next/image'

interface TextWithImageProps {
  text: string
  image: StaticImageData
  imageAlt: string
  imageSize?: number
}

const TextWithImageTop = ({ text, image, imageAlt, imageSize = 300 }: TextWithImageProps) => (
  <section className="my-6 flex flex-col items-center">
    <div className="mb-6" style={{ width: `${imageSize}px`, height: `${imageSize}px` }}>
      <Image src={image} alt={imageAlt} objectFit="cover" />
    </div>
    <div>
      <p className="text-center leading-relaxed">{text}</p>
    </div>
  </section>
)

export default TextWithImageTop
