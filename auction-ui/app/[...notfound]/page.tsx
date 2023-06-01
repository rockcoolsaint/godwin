import Link from 'src/components/shared/Link'
import Container from 'src/core/components/Container'

export const metadata = {
  title: 'Page not found - Rigly',
}

export default function NotFound() {
  return (
    <Container className="flex h-full items-center justify-center">
      <main className="grid h-[90vh] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Whoops!</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, this page does not exist.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-gradient px-3.5 py-2.5 text-sm font-normal text-white shadow-sm hover:cursor-pointer hover:bg-indigo-500 hover:bg-gradient-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Back to home
            </Link>
            <Link href="mailto:hello@rigly.io" className="text-sm font-normal text-gray-900  hover:cursor-pointer hover:underline">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </Container>
  )
}
