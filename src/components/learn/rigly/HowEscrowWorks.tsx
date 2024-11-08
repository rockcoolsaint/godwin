import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'

const HowEscrowWorks = () => {
  return (
    <>
      <LearnCategoryTitle>How Escrow Works</LearnCategoryTitle>

      <LearnCategoryText>
      We want you to get the hashrate you pay for. That's why we use on-chain escrow system that balances the needs of buyers and sellers.
      </LearnCategoryText>

      <LearnCategoryText>Here's a closer look at how our escrow process works.</LearnCategoryText>

      <LearnCategorySubTitle>1. Payment & Escrow Setup</LearnCategorySubTitle>

      <LearnCategoryText>
      When you purchase hashrate, 50% of the payment goes directly to the mining farm (seller), and the remaining 50% is placed in an on-chain multisig escrow, where it is held until hashrate is delivered per your mining agreement.
      </LearnCategoryText>

      <LearnCategorySubTitle>2. Escrow Signers</LearnCategorySubTitle>

      <LearnCategoryText>
      Escrow funds are protected in a 2:2 multisig wallet. This means two keys are required to release the funds—one held by Rigly and one by the Seller—ensuring that funds cannot be accessed or moved by either party alone.
      </LearnCategoryText>

      <LearnCategoryText>
        This non-custodial system ensures that neither party can unilaterally move the funds, providing a layer of trustless security to both parties
        involved.
      </LearnCategoryText>

      <LearnCategorySubTitle>3. Releasing Funds</LearnCategorySubTitle>

      <LearnCategoryText>
      As hashrate delivery progresses, funds from the escrow are gradually released to the seller.
      This staged release ensures security and reliability for both parties throughout the transaction.
      </LearnCategoryText>

      <LearnCategorySubTitle>Key Management Flexibility</LearnCategorySubTitle>

      <LearnCategoryText>
        Some sellers choose to manage their escrow directly, offering them control over the process. However, recognizing that some sellers
        prefer a more hands-off approach, we also offer the option to delegate escrow management.
      </LearnCategoryText>

      <LearnCategorySubTitle>2:3 Multisig Support</LearnCategorySubTitle>

      <LearnCategoryText>
        Looking ahead, we provide escrow service to meet the requirements of higher value hashrate agreements. <b>Rigly is able to coordinate 2:3 multisig</b> where the buyer also holds a key, offering an even higher level of security among all parties.
      </LearnCategoryText>

      <LearnCategoryText>
      Our Trustless Mining escrow is designed to make your experience secure, trustless, and simple.
      </LearnCategoryText>
    </>
  )
}

export default HowEscrowWorks
