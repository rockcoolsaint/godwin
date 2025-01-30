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
      You bid on hashrate and mine with me, as we try to mine a block. 
      </LearnCategoryText>
      <LearnCategoryText>
        The goal is to find a block and earn 3.125 bitcoin + tx fees <b>worth over $300,000</b>
      </LearnCategoryText>
      <LearnCategoryText>
        To get a spot on the party, place your bid on an auction.
      </LearnCategoryText>
      <LearnCategoryText>
      <b>Each auction is for hashrate (and a % of the reward) in the block party.</b>
      </LearnCategoryText>
      <LearnCategoryText>
        Hashrate is provided via <Link href="https://rigly.io" styled>Rigly</Link> and we use <Link href="https://solo.ckpool.org" styled>CK Pool</Link> to solo mine.
      </LearnCategoryText>
      <LearnCategoryText>
        Plus: <b>I add bonus hashrate</b> for new bidders and high bids.
      </LearnCategoryText>
      <LearnCategoryText>
      Bid high! and invite your friends!
      </LearnCategoryText>
      <div className="mb-20 mt-6 flex w-full flex-col items-center justify-center font-chakra font-bold sm:flex-row sm:px-10 lg:mt-12 lg:px-0">
                <Link 
                href={isLoggedIn ? '/pages/dashboard' : '/register'} // Change link based on auth status
                className="lg:h-15 flex w-11/12 items-center justify-center rounded-full bg-gradient px-5 py-4 text-lg text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:ml-16 lg:w-8/12 lg:text-2xl xl:w-4/12"
                >
                {isLoggedIn ? 'View the party' : 'Sign up'}
              </Link>
                </div>
    </>
  )
}

export default WhatIsUpendo
