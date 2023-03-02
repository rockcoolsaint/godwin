import NotFoundComponent from 'src/components/pages/shared/NotFoundComponent'

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <NotFoundComponent message="We couldn't find this page" />
    </div>
  )
}
