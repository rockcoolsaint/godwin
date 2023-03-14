import ActivityCard from 'src/components/shared/ActivityCard'
import NotFoundComponent from 'src/components/shared/NotFoundComponent'
import { useTranslation } from 'src/hooks/useTranslation'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <h1>Hello {t('home.loading')}</h1>
      <h2>Test</h2>
      <ActivityCard />
      <NotFoundComponent message="We couldn't find this page" />
    </div>
  )
}
