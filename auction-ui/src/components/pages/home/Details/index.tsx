import Link from 'src/components/shared/Link'
import Image, { StaticImageData } from 'next/image'
import { useTranslation } from 'src/hooks'
import styles from './index.module.css'
import clsx from 'clsx'

interface Props {
  title: string
  description: string
  imageSrc: string | StaticImageData
  className?: string
}

export default function Details({ title, imageSrc, className, description }: Props) {
  const { t } = useTranslation()

  return (
    <div className={clsx('mb-12 flex max-w-xl flex-col items-center rounded-xl border border-gray-400 bg-white md:mb-0', className)}>
      <Image width={250} height={280} className="mt-16" src={imageSrc} alt="asic mining rig" />
      <div className="mt-9 px-8 md:px-14">
        <h2 className="mb-5 text-3xl font-semibold md:w-9/12 md:text-4xl">
          <p className={styles['text-callout']} dangerouslySetInnerHTML={{ __html: title }} />
        </h2>
        <p className="text-sm text-dark-200 md:text-lg">{description}</p>
      </div>
      <div className="mt-9 flex w-full justify-center border-t border-t-gray-400 py-7">
        <Link className="text-sm text-primary hover:text-primary/[.85] md:text-lg" href="#">
          {t('home.learn_details')}
        </Link>
      </div>
    </div>
  )
}
