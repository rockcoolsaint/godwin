import Container from 'src/core/components/Container'
import Link from 'src/components/shared/Link'
import TestDrive from 'src/components/pages/home/JoinPool/TestDrive'
import TestDriveThreeSteps from 'src/components/pages/test-drive/TestDriveThreeSteps'

export default async function TestDrivePage() {
  return (
    <Container className="xl:w-full">
      <section className="flex w-full flex-col items-center py-10 lg:px-20">
        <h1 className="max-w-4xl bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text text-center text-4xl font-bold text-transparent lg:text-5xl 2xl:text-7xl">
          Try mining now
        </h1>
        <p className="my-5 w-11/12 text-center font-epilogue text-sm md:text-base lg:w-9/12 lg:text-xl 2xl:text-3xl">
          Buy 3 hours of hashrate for just 1,000 sats!
        </p>
      </section>
      <TestDriveThreeSteps />
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
