import { MiningCalculator } from 'src/components/pages/home/JoinPool/Calculator'
import Container from 'src/core/components/Container'
import Link from 'src/components/shared/Link'

export default async function DirectSalePage() {
  return (
    <Container className="py-12 xl:w-full">
      <MiningCalculator />
      <div className="my-8 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Do you need a mining pool account?</h2>
        <Link href="/path-to-mining-pools" className="text-md text-blue-600 hover:underline md:text-lg">
          Check out our mining pool profiles
        </Link>
      </div>
      <div className="my-8 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Are you new to bitcoin mining?</h2>
        <Link href="/path-to-test-drive" className="text-md text-blue-600 hover:underline md:text-lg">
          Try out mining test drive
        </Link>
      </div>
    </Container>
  )
}
