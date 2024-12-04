import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'
import Link from 'src/components/shared/Link'

const WhatIsUpendo = () => {
  return (
    <>
      <LearnCategoryTitle>Join our block party</LearnCategoryTitle>

      <LearnCategorySubTitle>Upendo is a block party auction</LearnCategorySubTitle>

      <LearnCategoryText>
        You bid on hashrate and mine with other bitcoiners, as we try to find a block. 
      </LearnCategoryText>
      <LearnCategoryText>
        For the next several weeks, we will mine with 1 PH/s - or more! - on Saturdays.
      </LearnCategoryText>
      <LearnCategoryText>
        The goal is <b>to find a block and earn 3.125 bitcoin + tx fees (!)</b>
      </LearnCategoryText>
      <LearnCategoryText>
        To get a spot on the party, you have to win an auction. Each auction is for 21 TH/s in the block party.
      </LearnCategoryText>
      <LearnCategoryText>
        Hashrate will be provided via <Link href="https://rigly.io" styled>Rigly</Link> and we will use <Link href="https://solo.ckpool.org" styled>CK Pool</Link> to solo mine.
      </LearnCategoryText>
      <LearnCategoryText>
        The block party earns bonus hashrate after each auction, and so the odds get better and better over the course of the auction ... so get your spot early!
      </LearnCategoryText>
      <LearnCategoryText>
        If we find a block, that would be incredible. And, if we don't, at least we have some fun mining together.
      </LearnCategoryText>
      <div className="mb-20 mt-6 flex w-full flex-col items-center justify-center font-chakra font-bold sm:flex-row sm:px-10 lg:mt-12 lg:px-0">
                <Link
                  href="https://upendo.rigly.io/register"
                  className="lg:h-15 flex w-11/12 items-center justify-center rounded-full bg-gradient px-5 py-4 text-lg text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:ml-16 lg:w-8/12 lg:text-2xl xl:w-4/12"
                >
                  Sign up to bid
                </Link>
                </div>
    </>
  )
}

export default WhatIsUpendo
