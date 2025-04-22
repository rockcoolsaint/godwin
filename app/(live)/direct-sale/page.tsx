'use client'
import { MiningCalculator } from 'src/components/pages/home/JoinPool/Calculator'
import Container from 'src/core/components/Container'
import Link from 'src/components/shared/Link'
import { useAccountContext } from 'src/providers/AccountProvider'

export default function DirectSalePage() {
  const { account } = useAccountContext()

  return (
    <Container className="xl:w-full px-4 md:px-8 lg:px-12">
      {/* Main Heading */}
      <h1 className="text-center mb-12 pt-12 pb-4 leading-normal bg-gradient-to-r from-[#f08222] to-[#ff9f4d] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
        Buy Hashrate to Join the Block Party
      </h1>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row lg:gap-16 max-w-6xl mx-auto">
        {/* Left side - Block Party Instructions */}
        <div className="lg:w-2/5 flex flex-col items-start justify-center mb-8 lg:mb-0">
          <h2 className="text-2xl font-bold mb-6">Join our Block Party</h2>
          
          <div className="space-y-4 text-gray-600">

            <p>
              If we successfully mine a block, you receive your share of the reward based on your hashrate contribution.
            </p>


            <div className="mt-6">
              <Link href="/pages/dashboard" className="text-blue-600 hover:underline">
                Monitor the block party live →
              </Link>
            </div>
          </div>
        </div>

        {/* Right side - Buy Box */}
        <div className="lg:w-3/5">
          <MiningCalculator />
        </div>
      </div>
    </Container>
  )
}