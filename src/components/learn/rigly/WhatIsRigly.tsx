import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'
import MiningPlan from 'src/assets/webp/mining_plan.webp' // This should be replaced with the correct images later
import Trust from 'src/assets/webp/trust.webp'
import Link from 'src/components/shared/Link'

const WhatIsRigly = () => {
  return (
    <>
      <LearnCategoryTitle>What is Rigly?</LearnCategoryTitle>

      <LearnCategorySubTitle>Rigly is the first auction marketplace for hashrate</LearnCategorySubTitle>

      <LearnCategoryText>
        You can buy hashrate from mining farms around the world and mine bitcoin - <b>with a real chance of earning a profit.</b>
      </LearnCategoryText>
      <LearnCategoryText>
        Rigly is the real deal.
      </LearnCategoryText>
      <LearnCategoryText>
      We are <u>not</u> like other spot hashrate markets that do <Link href="https://www.reddit.com/r/NiceHash/comments/1fvteua/this_exchange_is_pushing_kyc_on_uslets_move_to_a" styled>shotgun KYC</Link>.
      </LearnCategoryText>

      <LearnCategoryText>
      We are <u>not</u> a <Link href="https://bitcointalk.org/index.php?topic=5151528.0" styled>cloud mining</Link> provider.
      </LearnCategoryText>


      <LearnCategorySubTitle>Peer-to-peer</LearnCategorySubTitle>

      <LearnCategoryText>
        Rigly auctions provide <b>on-chain escrow protection</b> encouraging a secure and transparent transaction.
      </LearnCategoryText>

      <LearnCategoryText>
        Hashrate is sent from the mining farm to your pool account (or bitcoin node) peer-to-peer via the stratum protocol.
      </LearnCategoryText>

      <LearnCategorySubTitle>Square deal</LearnCategorySubTitle>

      <LearnCategoryText>
        Hashrate is a scarce resource and Rigly offers a fair and transparent platform for price discovery - highest bid wins.
      </LearnCategoryText>

      <LearnCategoryText>
        The payment process is fair to buyers and sellers. Mining farms get <b>50% payment upfront</b> and <b>50% is held in escrow</b>, released after hashrate delivery.
      </LearnCategoryText>

      <LearnCategorySubTitle>Mining farms earn more and scale faster</LearnCategorySubTitle>

      <LearnCategoryText>
        Selling hashrate on Rigly is pure win for miners.
      </LearnCategoryText>
      <LearnCategoryText>
        You earn a premium to FPPS as we bootstrap the marketplace, and then you can take the auction price and get 50% payment upfront as an established seller.
      </LearnCategoryText>
    </>
  )
}

export default WhatIsRigly
