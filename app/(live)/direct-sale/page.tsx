'use client'
import { MiningCalculator } from 'src/components/pages/home/JoinPool/Calculator'
import Container from 'src/core/components/Container'
import Link from 'src/components/shared/Link'
import DirectSaleThreeSteps from 'src/components/pages/direct-sale/DirectSaleThreeSteps'
import { useAccountContext } from 'src/providers/AccountProvider'

export default function DirectSalePage() {
  const { account } = useAccountContext()

  return (
    <Container className="xl:w-full">
      <section className="flex w-full flex-col items-center py-10 lg:px-20">
        <h1 className="max-w-4xl bg-gradient-to-r from-[#5C3FAF] to-[#316AEF] bg-clip-text text-center text-4xl font-bold text-transparent pb-2 md:text-5xl lg:text-6xl 2xl:text-7xl">
          Buy Hashrate and Start Mining Now
        </h1>
        <p className="my-5 w-11/12 text-center font-epilogue text-sm md:text-base lg:w-9/12 lg:text-xl 2xl:text-3xl">
          Jump right in and start mining to your pool account
        </p>
      </section>
      <DirectSaleThreeSteps />
      <MiningCalculator />
      <div className="my-8 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Do you need a mining pool account?</h2>
        <Link href="/path-to-mining-pools" className="text-md text-blue-600 hover:underline md:text-lg">
          Check out our mining pool profiles
        </Link>
      </div>
      {/* only render if user is not authenticated already */}
      {!account && (
        <div className="my-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Are you new to bitcoin mining?</h2>
          <Link href="/test-drive" className="text-md text-blue-600 hover:underline md:text-lg">
            Try out mining test drive
          </Link>
        </div>
      )}
    </Container>
  )
}
