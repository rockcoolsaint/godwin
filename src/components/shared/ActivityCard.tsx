'use client'

import { useTranslation } from 'src/hooks'

export default function ActivityCard() {
  const { t } = useTranslation()

  return (
    <>
      <h1 className="text-2xl underline">Activity card</h1>
      <h1>{t('home.loading')}</h1>
    </>
  )
}
