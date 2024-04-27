import Container from 'src/core/components/Container'
import Link from 'src/components/shared/Link'
import TestDrive from 'src/components/pages/home/JoinPool/TestDrive'
import TestDriveThreeSteps from 'src/components/pages/test-drive/TestDriveThreeSteps'

export default async function TestDrivePage() {
  return (
    <Container className="py-12 xl:w-full">
      <section className="flex w-full flex-col items-center lg:p-20">
        <h1 className="my-6 bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text text-center text-4xl font-bold text-transparent">
          Try mining now
        </h1>
        <p className="my-5 w-11/12 text-center font-epilogue text-sm md:text-base lg:my-10 lg:w-9/12 lg:text-xl 2xl:text-3xl">
          Buy 3 hours of hashrate for just 500 sats!
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
