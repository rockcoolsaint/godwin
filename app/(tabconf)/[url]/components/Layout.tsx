import Header from 'src/components/shared/Header'
import Footer from 'src/components/shared/Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <main className="flex-auto">{children}</main>
      </div>
      <Footer />
    </>
  )
}
