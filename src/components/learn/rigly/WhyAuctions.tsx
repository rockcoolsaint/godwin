import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'

const WhyAuctions = () => {
  return (
    <>
      <LearnCategoryTitle>Why Auctions?</LearnCategoryTitle>

      <LearnCategoryText>
        At Rigly, we use auctions to sell Bitcoin mining hashrate, aligning with the unique dynamics of Bitcoin mining. Here’s why auctions are the ideal fit:
      </LearnCategoryText>

      <LearnCategorySubTitle>Scarcity</LearnCategorySubTitle>
      <LearnCategoryText>
        Hashrate is limited, both by the number of mining farms and the amount each can provide. There are only a few hashrate marketplaces. Auctions on Rigly allocate this scarce resource to those who value it most.
      </LearnCategoryText>

      <LearnCategorySubTitle>High Demand</LearnCategorySubTitle>
      <LearnCategoryText>
        Mining's potential profit drives high demand for hashrate. Auctions offer a fair, competitive way for buyers to access this limited resource, giving everyone a chance to bid.
      </LearnCategoryText>

      <LearnCategorySubTitle>Maximized Miner Returns</LearnCategorySubTitle>
      <LearnCategoryText>
        For miners, selling hashrate via auctions allows them to access upfront liquidity, so they can scale their operations faster. Plus, auctions potentially yield more profit than mining directly, as competitive bidding drives prices up.
      </LearnCategoryText>

      <LearnCategorySubTitle>Balanced Marketplace</LearnCategorySubTitle>
      <LearnCategoryText>
        Rigly’s auction model creates a dynamic, balanced marketplace that respects the value of hashrate and promotes healthy competition, benefiting both buyers and sellers.
      </LearnCategoryText>
    </>
  )
}

export default WhyAuctions
