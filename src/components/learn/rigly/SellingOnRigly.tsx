import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'
import MiningPlan from 'src/assets/webp/mining_plan.webp' // This should be replaced with the correct images later

const SellingOnRigly = () => {
  return (
    <>
      <LearnCategoryTitle>Sell Your Hashrate</LearnCategoryTitle>

      <LearnCategoryText>Why pay fees to a mining pool when you can earn more on Rigly?</LearnCategoryText>

      <LearnCategorySubTitle>How it works</LearnCategorySubTitle>
      <LearnCategoryText>
        Rigly pays you a premium to FPPS as we bootstrap our marketplace. You receive payment in bitcoin based on hashrate received at our stratum proxy. Funds are held in multisig escrow and you receive
        payouts after hashrate has been delivered.
      </LearnCategoryText>
      <LearnCategoryText>
        Rigly's payout premium is <b>a percentage over FPPS hashprice</b>, based on the Luxor hashrateindex.
      </LearnCategoryText>

      <LearnCategorySubTitle>What if the auction sells for a low price?</LearnCategorySubTitle>

      <LearnCategoryText>
        Rigly offers miners a fixed premium - you earn the premium to FPPS regardless of auction closing price. We do this to build up supply as we scale our marketplace.
      </LearnCategoryText>

      <LearnCategorySubTitle>Where do I sign up?</LearnCategorySubTitle>

      <LearnCategoryText>
        Please send an email to{' '}
        <a href="mailto:hello@rigly.io" className="text-blue-500 hover:text-blue-700">
          hello@rigly.io
        </a>{' '}
        for next steps.
      </LearnCategoryText>
    </>
  )
}
export default SellingOnRigly
