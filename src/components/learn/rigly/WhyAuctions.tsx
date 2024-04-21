import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'

const WhyAuctions = () => {
  return (
    <>
      <LearnCategoryTitle>Why Auctions?</LearnCategoryTitle>

      <LearnCategoryText>
        At Rigly, we've chosen a unique approach to selling Bitcoin mining hashrate: auctions. This method isn't just a business choice;
        it's a response to the intrinsic nature of Bitcoin mining and the marketplace dynamics. Here's why auctions are the best fit for
        selling hashrate on Rigly:
      </LearnCategoryText>

      <LearnCategorySubTitle>Hashrate Is a Scarce Resource</LearnCategorySubTitle>
      <LearnCategoryText>
        Bitcoin mining depends on the availability of mining farms, which are not only limited in number but also in the amount of hashrate
        they can produce at any given time. Among these, only a select few choose to sell their hashrate through Rigly. This scarcity of
        hashrate makes it a valuable commodity, much like a rare gem in a sea of stones. Auctions are an effective way to manage such a
        scarce resource, ensuring that it is available to those who value it most.
      </LearnCategoryText>

      <LearnCategorySubTitle>High Demand Among Buyers</LearnCategorySubTitle>
      <LearnCategoryText>
        The desire to mine Bitcoin is driven by several factors, chief among them the opportunity to earn new Bitcoin directly from the
        protocol. This is a powerful incentive, and as a result, the demand for hashrate significantly exceeds the supply available. With
        more buyers than there is available hashrate, an auction becomes the most fair and efficient method to distribute this limited
        resource: everyone gets a fair chance to bid for the hashrate they need.
      </LearnCategoryText>

      <LearnCategorySubTitle>Max Returns for Miners</LearnCategorySubTitle>
      <LearnCategoryText>
        For miners, the decision to sell hashrate rather than mine for themselves is driven by economics. By auctioning their hashrate,
        miners can often earn more than they would through mining themselves. This is because the auction format allows buyers to bid
        competitively, pushing the price to its highest possible point. The miner benefits from the highest bid, which often includes a
        premium over the regular spot hashprice. For the buyer, winning the auction means securing a coveted resource in a competitive
        market, and for the miner, it translates to maximum earnings. It's truly a win-win situation.
      </LearnCategoryText>

      <LearnCategorySubTitle>Fair and Balanced</LearnCategorySubTitle>
      <LearnCategoryText>
        The auction model at Rigly isn’t just about buying and selling; it’s about creating a dynamic marketplace that respects the value of
        hashrate, balances supply and demand, and maximizes the benefits for both buyers and sellers. This approach not only fosters
        fairness but also encourages a healthy competitive spirit that is essential for a thriving market.
      </LearnCategoryText>
    </>
  )
}

export default WhyAuctions
