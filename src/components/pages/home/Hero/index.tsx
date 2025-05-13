import { PropsWithChildren, useState } from 'react'
import { MiningCalculator } from 'src/components/pages/home/JoinPool/Calculator'
import Link from 'src/components/shared/Link'
import { useAccountContext } from 'src/providers/AccountProvider'

const MinerInstructions = () => (
  <div className="border rounded-lg p-6 space-y-4 bg-white">
    <h3 className="font-medium text-gray-900 text-xl mb-4">
      If you have a Bitaxe or any other mining rig, send your hash:
    </h3>
    
    <div className="space-y-4 bg-gray-50 p-4 rounded">
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Stratum address:</label>
        <div className="text-gray-900 break-all bg-white p-2 rounded border border-gray-200">
          solo.ckpool.org:3333
        </div>
      </div>
      
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Username:</label>
        <div className="text-gray-900 break-all bg-white p-2 rounded border border-gray-200">
         3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH.mybtcaddress
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-4">
        Important: Replace <b>"mybtcaddress"</b> with <b>your BTC payout address</b>
      </div>
    </div>

    <div className="mt-6 space-y-4">
      <div>
        <h4 className="font-medium mb-2"># During the blockparty</h4>
        <p>You get your share of the reward based on hashrate contribution</p>
      </div>

      <div>
        <h4 className="font-medium mb-2"># Pre-game mining</h4>
        <p>Outside of the party, <b>the miner who finds the block gets 1 BTC</b> and everyone else gets a share of the reward based on hashrate contribution</p>
      </div>
    </div>
  </div>
)

const Hero = ({ children }: PropsWithChildren) => {
  const { account } = useAccountContext()
  const [activeTab, setActiveTab] = useState<'buy' | 'miner'>('buy')

  return (
    <section className="w-full px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-16">
          
          {/* Left side */}
          <div className="lg:w-2/5 flex flex-col items-start justify-center mb-8 lg:mb-0">
            <div className="space-y-4">
              <p className="text-2xl text-gray-600"><b>Solo mine with bitcoiners</b></p>
              <p className="text-xl text-gray-600">It's a block party!</p>
              {activeTab === 'buy' ? (
                <p className="text-xl text-gray-600">
                  If we mine a block, your reward is based on your hashrate contribution.
                </p>
              ) : (
                <p className="text-xl text-gray-600">
                  Send your hashrate to our CK Pool address and mine with us.
                </p>
              )}
              <div className="mt-6">
                <Link href="/pages/dashboard" className="text-lg text-blue-600 hover:underline">
                  Monitor the block party live →
                </Link>
              </div>
            </div>
          </div>



            {/* Right side */}
            <div className="lg:w-3/5">
              {/* Tabs - Centered */}
              <div className="flex justify-center mb-4 border-b">
                <div className="inline-flex">
                  <button
                    className={`px-6 py-2 font-medium ${
                      activeTab === 'buy'
                        ? 'text-orange-500 border-b-2 border-orange-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('buy')}
                  >
                    Buy hashrate
                  </button>
                  <button
                    className={`px-6 py-2 font-medium ${
                      activeTab === 'miner'
                        ? 'text-orange-500 border-b-2 border-orange-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('miner')}
                  >
                    I have a miner
                  </button>
                </div>
              </div>

              {/* Tab content */}
              {activeTab === 'buy' ? (
                <MiningCalculator />
              ) : (
                <MinerInstructions />
              )}
            </div>

        </div>
      </div>

      {children}
    </section>
  )
}

export default Hero