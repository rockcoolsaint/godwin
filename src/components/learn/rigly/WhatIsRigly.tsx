import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'
import MiningPlan from 'src/assets/webp/mining_plan.webp' // This should be replaced with the correct images later
import Trust from 'src/assets/webp/trust.webp'

const WhatIsRigly = () => {
  return (
    <>
      <LearnCategoryTitle>What is Rigly?</LearnCategoryTitle>

      <LearnCategorySubTitle>We&apos;re the first auction marketplace for hashrate</LearnCategorySubTitle>

      <LearnCategoryText>
        The Rigly marketplace offers a seamless solution for both buyers and sellers of hashrate. <b>For the first time</b>, individuals can
        engage in bitcoin mining without the hassle of buying hardware. Rigly introduces an auction system <b>with escrow protection</b>,
        ensuring a secure and transparent transaction.
      </LearnCategoryText>

      <LearnCategoryText>
        Buyers can confidently mine Bitcoin, free from the risks of being &quot;rug pulled&quot; while mining farms optimize their earnings
        by leveraging the Rigly platform. <b>It&apos;s a win-win</b>.
      </LearnCategoryText>

      <LearnCategorySubTitle>Buy Hashrate and Start Mining Right Away</LearnCategorySubTitle>

      <LearnCategoryText>
        With Rigly, accessing hashrate has never been easier. Buyers have the flexibility to purchase hashrate either at a fixed price or
        via auction. Once purchased, the hashrate is swiftly transferred from the mining farm to the buyer&apos;s mining pool account
        through a peer-to-peer (P2P) process facilitated by Rigly&apos;s stratum proxy.
      </LearnCategoryText>

      <LearnCategoryText>
        The payment process incorporates an escrow mechanism, ensuring that the seller is only paid after the hashrate delivery is a
        success.
      </LearnCategoryText>

      <LearnCategorySubTitle>Get the Best Price via Auction</LearnCategorySubTitle>

      <LearnCategoryTextWithImage
        text="Hashrate is a scarce resource and Rigly's auction platform offers a fair and transparent platform for price discovery. Through auctions, buyers benefit from an open market environment where prices are determined based on supply and demand."
        image={MiningPlan}
        imageAlt="Auction process illustration"
        imagePosition="left"
      />

      <LearnCategorySubTitle>Earn more for your hashrate</LearnCategorySubTitle>

      <LearnCategoryTextWithImage
        text="Selling hashrate on Rigly presents an attractive opportunity for mining farms. With hashrate selling at an <b>average premium of 10-15%</b> (or more) compared to spot hash price, sellers stand to earn significantly higher returns by leveraging Rigly's platform."
        image={Trust}
        imageAlt="Mining illustration"
        imagePosition="right"
      />
    </>
  )
}

export default WhatIsRigly
