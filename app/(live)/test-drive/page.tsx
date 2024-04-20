import Container from 'src/core/components/Container'
import Link from 'src/components/shared/Link'
import TestDrive from 'src/components/pages/home/JoinPool/TestDrive'

export default async function TestDrivePage() {
  return (
    <Container className="py-12 xl:w-full">
      <TestDrive />
      <div className="my-8 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Already have a mining pool account?</h2>
        <Link href="/direct-sale" className="text-md text-blue-600 hover:underline md:text-lg">
          Skip the test drive and buy hashrate now
        </Link>
      </div>
    </Container>
  )
}
