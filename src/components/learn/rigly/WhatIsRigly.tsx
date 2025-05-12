import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'
import Link from 'src/components/shared/Link'
import { useAccountContext } from 'src/providers/AccountProvider'

const WhatIsUpendo = () => {
  const { account } = useAccountContext()
  const isLoggedIn = Boolean(account?.email)

  return (
    <>
      <LearnCategoryTitle>Join Our Bitcoin Mining Block Party</LearnCategoryTitle>


      <div className="mt-10 flex justify-center">
  <div className="relative w-[600px] aspect-video">
    <iframe 
      src="https://www.loom.com/embed/bfb1d104a7ca483e9cedb34d1caf17a3?sid=0a3586fd-32f4-4211-86b1-4ac177d9e78c" 
      frameBorder="0" 
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
      className="w-full h-full"
    />
  </div>
</div>
<br/>

      <LearnCategoryText>
        Hi -- I'm Evan, co-founder of <Link href="https://rigly.io" styled>Rigly</Link>
      </LearnCategoryText>
      <LearnCategoryText>
      Join us as we try to mine a block. 
      </LearnCategoryText>
      <LearnCategoryText>
        The goal is to find a block and earn 3.125 bitcoin + tx fees <b>worth over $300,000</b>
      </LearnCategoryText>
      <LearnCategoryText>
        There are 3 ways to get a spot on the party - <b>a) buy hashrate on the front page</b> and <b>b) bid on a hashrate auction</b> or <b>c) use your own miner</b>
      </LearnCategoryText>
      <LearnCategoryText>
        Hashrate is provided via <Link href="https://rigly.io" styled>Rigly</Link> and we use <Link href="https://solo.ckpool.org" styled>CK Pool</Link> to solo mine.
      </LearnCategoryText>
      <LearnCategorySubTitle>
      How Auction Works
      </LearnCategorySubTitle>
      <LearnCategoryText>
      In the auction, when you bid over the cost of hashrate, the extra sats go to bonus hashrate for the block party.
      </LearnCategoryText>
      <LearnCategoryText>
      To further the incentive, I match 21% of bonus hashrate, improving our odds even more.
      </LearnCategoryText>
      <LearnCategoryText>
      When you <b>direct buy</b> hashrate in the block party, your reward is calculated on the total block party hashrate.
      </LearnCategoryText>
      <LearnCategoryText>
      When you <b>auction buy</b> hashrate in the block party, your reward is calculated with other auction bidders, so you get direct benefit from bonus hashrate.
      </LearnCategoryText>
      <LearnCategoryText>
      This way, auction bidders are incentivized and everyone benefits from the bonus hashrate.
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
                href={isLoggedIn ? '/pages/dashboard' : '/register'} // Change link based on auth status
                className="lg:h-15 flex w-11/12 items-center justify-center rounded-full bg-gradient px-5 py-4 text-lg text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:ml-16 lg:w-8/12 lg:text-2xl xl:w-4/12"
                >
                {isLoggedIn ? 'View the party' : 'Sign up to bid'}
              </Link>
                </div>
    </>
  )
}

export default WhatIsUpendo
