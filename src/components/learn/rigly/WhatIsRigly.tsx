import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'
import Link from 'src/components/shared/Link'
import { useAccountContext } from 'src/providers/AccountProvider'
import Blockparty from 'src/images/get_in.png'
import Image from 'next/image'

const WhatIsUpendo = () => {
  const { account } = useAccountContext()
  const isLoggedIn = Boolean(account?.email)

  return (
    <>

      <div className="mt-10 flex justify-left">
  <div className="relative w-[600px]">
              <a href="/pages/dashboard" target="_blank" rel="noopener noreferrer">
                <Image 
                  src={Blockparty} 
                  alt="Block party with us" 
                  width={400} 
                  height={400} 
                  objectFit="contain" 
                />
              </a>
  </div>
</div>
<br/>

      <LearnCategoryText>
        Hi -- Evan here, co-founder of <Link href="https://rigly.io" styled>Rigly</Link>
      </LearnCategoryText>
      <LearnCategoryText>
      Join us as we try to mine a block. 
      </LearnCategoryText>
      <LearnCategoryText>
        The goal is to find a block and earn 3.125 bitcoin + tx fees <b>worth over $300,000</b>
      </LearnCategoryText>
      <LearnCategoryText>
        There are 2 ways to get a spot on the party - <b>a) buy hashrate on the front page</b> or <b>b) use your own miner</b>
      </LearnCategoryText>
      <LearnCategoryText>
        Hashrate is provided via <Link href="https://rigly.io" styled>Rigly</Link> and we use <Link href="https://solo.ckpool.org" styled>CK Pool</Link> to solo mine.
      </LearnCategoryText>
      <LearnCategorySubTitle>
      Pick your team - win 21% more reward
      </LearnCategorySubTitle>
      <LearnCategoryText>
      If we mine a block during the block party, the reward is split by hashrate contribution, and <b>the team that contributes the most hashrate gets 21% more of the reward</b>.
      </LearnCategoryText>
      <LearnCategoryText>
      This way, there is an incentive to spread the word and refer people to your team!
      </LearnCategoryText>
      <LearnCategorySubTitle>Do you have your own ASIC miner?</LearnCategorySubTitle>
      
      <LearnCategoryText>
        If you have a Bitaxe or any other mining rig, send your hash to the block party!
      </LearnCategoryText>

      <LearnCategoryText>
        <ul className="list-disc pl-6">
          <li>Stratum address: solo.ckpool.org:3333</li>
          <li>Username: 3Gk1GfP3bHA6M2ZzK5mHdqbWN1iNsqAenH</li>
          <li>Put your BTC payout address as the workername (important!)</li>
        </ul>
      </LearnCategoryText>
      <LearnCategoryText>If we mine a block during the party, you will get your share of the reward based on hashrate contribution.</LearnCategoryText>

      <LearnCategoryText>
      Outside of the party, the miner who finds the block gets 1 BTC and everyone else gets a share of the reward based on hashrate contribution.
      </LearnCategoryText>
      
      <div className="mb-20 mt-6 flex w-full flex-col items-center justify-center font-chakra font-bold sm:flex-row sm:px-10 lg:mt-12 lg:px-0">
                <Link 
                href="/pages/dashboard"
                className="lg:h-15 flex w-11/12 items-center justify-center rounded-full bg-gradient px-5 py-4 text-lg text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:ml-16 lg:w-8/12 lg:text-2xl xl:w-4/12"
                >
                View the party
              </Link>
                </div>
    </>
  )
}

export default WhatIsUpendo
