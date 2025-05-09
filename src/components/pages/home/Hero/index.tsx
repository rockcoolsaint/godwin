import { PropsWithChildren } from 'react'
import { MiningCalculator } from 'src/components/pages/home/JoinPool/Calculator'
import Link from 'src/components/shared/Link'
import { useAccountContext } from 'src/providers/AccountProvider'

const Hero = ({ children }: PropsWithChildren) => {
  const { account } = useAccountContext()

  return (
    <section className="w-full px-4 md:px-8 lg:px-12">
      {/* Main Header */}
      <div className="text-center mb-8">
        <h1 className="font-epilogue text-4xl font-extrabold text-[#f08222] md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
          Solo mine with bitcoiners
        </h1>
      </div>

      {/* Direct Sale Content */}
      <div className="max-w-6xl mx-auto">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row lg:gap-16">

        {/* Left side - Block Party Instructions */}
        <div className="lg:w-2/5 flex flex-col items-start justify-center mb-8 lg:mb-0">
          <div className="space-y-4">
          <p className="text-2xl text-gray-600"><b>Join our Block Party</b>  </p>
            <p className="text-2xl text-gray-600">
              If we successfully mine a block, your reward is based on your hashrate contribution
            </p>

            <div className="mt-6">
              <Link href="/pages/dashboard" className="text-xl text-blue-600 hover:underline">
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
      </div>

      {/* Original children content */}
      {children}
    </section>
  )
}

export default Hero