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
        The Rigly marketplace offers a seamless solution for both buyers and sellers of hashrate. Everyone can
        mine bitcoin without the hassle of buying hardware. Rigly auctions provide <b>escrow protection</b>,
        encouraging a secure and transparent transaction.
      </LearnCategoryText>

      <LearnCategoryText>
        You can confidently mine bitcoin, with less risk of being rug pulled, and with the chance of earning a profit, and mining farms can optimize their earnings.
      </LearnCategoryText>

      <LearnCategorySubTitle>Peer-to-peer - and fair to buyers and sellers</LearnCategorySubTitle>

      <LearnCategoryText>
        You can buy hashrate at a fixed price or via auction. Hashrate is sent from the mining farm to your mining pool account
        peer-to-peer via the stratum protocol.
      </LearnCategoryText>

      <LearnCategoryText>
        The payment process is fair to buyers and sellers. Mining farms get <b>50% payment upfront</b> and <b>50% is held in multisig escrow</b>, released after hashrate delivery.
      </LearnCategoryText>

      <LearnCategorySubTitle>Get the best price</LearnCategorySubTitle>

      <LearnCategoryText>
        Hashrate is a scarce resource and Rigly offers a fair and transparent platform for price discovery - highest bid wins.
      </LearnCategoryText>

      <LearnCategorySubTitle>Mining farms earn more and scale faster</LearnCategorySubTitle>

      <LearnCategoryText>
        Selling hashrate on Rigly is pure win for miners. We pay you a premium to FPPS as we bootstrap the marketplace, and then you can opt to take the auction price and get 50% payment upfront as an established seller.
      </LearnCategoryText>
    </>
  )
}

export default WhatIsRigly
