import Container from 'src/core/components/Container'

export const metadata = {
  title: 'Page not found - Rigly',
}

export default function NotFound() {
  return (
    <Container className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl font-bold">Whoops</span>
        <span className="text-lg">Seems like this page has been sent to the wrong wallet address!</span>
      </div>
    </Container>
  )
}
