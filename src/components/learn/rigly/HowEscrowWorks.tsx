import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'

const HowEscrowWorks = () => {
  return (
    <>
      <LearnCategoryTitle>How Escrow Works</LearnCategoryTitle>

      <LearnCategoryText>
        At Rigly, we are dedicated to ensuring you get the hashrate you pay for. This is done via Trustless Mining - our escrow system -
        designed to safeguard both buyers and sellers during the delivery of hashrate.
      </LearnCategoryText>

      <LearnCategoryText>Here's a closer look at how our escrow process works.</LearnCategoryText>

      <LearnCategorySubTitle>1. Initiate the Transaction</LearnCategorySubTitle>

      <LearnCategoryText>
        When you purchase hashrate on Rigly, the payment isn't sent directly to the seller. Instead, it is placed in an on-chain escrow.
        This means that the funds are locked on the blockchain, ensuring that they are protected and can't be accessed by either party
        without mutual consent.
      </LearnCategoryText>

      <LearnCategorySubTitle>2. Secure Handling with Multisig</LearnCategorySubTitle>

      <LearnCategoryText>
        To further secure the transaction, Rigly utilizes a 2:2 multisig wallet setup. In this arrangement, two keys are required to
        authorize any transaction, one held by Rigly and the other by the mining farm (the seller).
      </LearnCategoryText>

      <LearnCategoryText>
        This system ensures that neither party can unilaterally move the funds, providing a layer of trustless security to both parties
        involved.
      </LearnCategoryText>

      <LearnCategorySubTitle>3. Releasing Funds</LearnCategorySubTitle>

      <LearnCategoryText>
        Once you receive the hashrate per the agreement, the escrow is resolved and the seller receives their payout. This confirmation
        triggers a collaborative signing process between Rigly and the mining farm to release the funds.
      </LearnCategoryText>

      <LearnCategorySubTitle>Key Management Flexibility</LearnCategorySubTitle>

      <LearnCategoryText>
        Some sellers choose to manage their escrow directly, offering them control over the process. However, recognizing that some sellers
        prefer a more hands-off approach, we also offer the option to delegate escrow management.
      </LearnCategoryText>

      <LearnCategorySubTitle>Future Development</LearnCategorySubTitle>

      <LearnCategoryText>
        Looking ahead, we plan to evolve our escrow services to incorporate buyers directly into the escrow. This advancement will introduce
        a 2:3 multisig system, where the buyer will also hold a key, offering an even higher level of security among all parties.
      </LearnCategoryText>

      <LearnCategoryText>
        Rigly’s escrow system is at the heart of our commitment to provide a secure and reliable platform for buying hashrate. Whether you
        are a buyer or a seller, our escrow process is designed to protect you and facilitate smooth transactions.
      </LearnCategoryText>
    </>
  )
}

export default HowEscrowWorks
