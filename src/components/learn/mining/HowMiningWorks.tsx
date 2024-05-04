import Image from 'next/image'
import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'
import Blocks from 'src/images/blocks.png'
import Miner from 'src/images/miner.png'
import TwoMiners from 'src/images/two-miners.png'
import Bitcoin from 'src/images/bitcoin.png'
import Verified from 'src/images/verified.png'
import Security from 'src/images/security.png'
import Gauge from 'src/images/gauge.png'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'

const HowMiningWorks = () => {
  return (
    <>
      <LearnCategoryTitle>How mining works</LearnCategoryTitle>

      <LearnCategoryText>
        Bitcoin mining is the process where transactions are finalized and new bitcoin is released into the network. The process is much
        like a lottery: miners compete for a monetary incentive - and you need a lot of computing power to do it.
      </LearnCategoryText>
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <LearnCategoryTextWithImage
          text="Each block on the timechain has a mathematical fingerprint called a 'hash'. Miners compete to find this fingerprint."
          image={Blocks}
          imageAlt="Timechain illustration"
          imagePosition="top"
          imageSize={200}
        />

        <LearnCategoryTextWithImage
          text="Miners use specialized, high-energy computers called mining rigs. These computers use trial and error, guessing repeatedly until they find the fingerprint."
          image={Miner}
          imageAlt="Mining rigs illustration"
          imagePosition="top"
          imageSize={200}
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <LearnCategoryTextWithImage
          text="The more computer power a miner uses, the more attempts they can make to find the fingerprint."
          image={TwoMiners}
          imageAlt="Computing power illustration"
          imagePosition="top"
          imageSize={200}
        />

        <LearnCategoryTextWithImage
          text="The first computer to accurately find the fingerprint is able to add the block to the blockchain and is rewarded new bitcoin - aka a block reward."
          image={Bitcoin}
          imageAlt="Block reward illustration"
          imagePosition="top"
          imageSize={200}
        />
      </div>
      <LearnCategorySubTitle center>What mining pools do</LearnCategorySubTitle>

      <div className="md:grid md:grid-cols-2 md:gap-4">
        <LearnCategoryTextWithImage
          text="As a single miner, you are very unlikely to find a block on your own. That's why most miners choose to send their hashrate to a mining pool and earn more frequent, predictable rewards."
          image={Miner}
          imageAlt="Mining pool illustration"
          imagePosition="top"
          imageSize={200}
        />

        <LearnCategoryTextWithImage
          text="With a mining pool, your hashrate is combined with thousands of other users on the pool. Block rewards earned by the pool are shared proportionally across all users."
          image={TwoMiners}
          imageAlt="Mining pool illustration"
          imagePosition="top"
          imageSize={200}
        />
      </div>
      <LearnCategorySubTitle center>What mining does</LearnCategorySubTitle>

      <div className="my-6 flex justify-around">
        <div className="flex flex-col items-center">
          <Image src={Verified} alt="Verify transactions illustration" width={100} height={100} objectFit="contain" />
          <span className="mt-2 text-sm font-bold">Verify transactions</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src={Security} alt="Security illustration" width={100} height={100} objectFit="contain" />
          <span className="mt-2 text-sm font-bold">Security</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src={Bitcoin} alt="Distribute bitcoin illustration" width={100} height={100} objectFit="contain" />
          <span className="mt-2 text-sm font-bold">Distribute bitcoin</span>
        </div>
      </div>

      <LearnCategoryText>
        Miners make sure each transaction is valid. Traditional banks do this behind the scenes and transactions can take days to fully
        process. Bitcoin mining verifies transactions within minutes and makes them visible for everyone to see.
      </LearnCategoryText>

      <LearnCategoryText>
        Bitcoin's transaction history is public, which helps eliminate the potential of <b>double spending</b> and makes the network almost
        impossible to hack.
      </LearnCategoryText>

      <LearnCategoryText>Last but not least, miners are rewarded for their time and proof-of-work with new bitcoin.</LearnCategoryText>
      <LearnCategorySubTitle>Staying on schedule</LearnCategorySubTitle>
      <LearnCategoryTextWithImage
        text="Mining difficulty is automatically adjusted higher or lower every 2,016 blocks - roughly every 2 weeks - to maintain an average 10 minute block interval.  This is called the <b>difficulty adjustment</b> and is one of the key innovations in bitcoin. As miners come and go, the difficulty adjustment ensures bitcoin distribution via mining continues at the same steady pace."
        image={Gauge}
        imageAlt="Timechain illustration"
        imagePosition="left"
        imageSize={200}
      />
      <LearnCategoryText center>
        This page was based on{' '}
        <a
          className="text-blue-600 visited:text-purple-600"
          href="https://www.fidelity.com/learning-center/trading-investing/crypto/what-is-mining"
          target="_blank"
          rel="noreferrer"
        >
          Fidelity's excellent infographic
        </a>
        . Check it out!
      </LearnCategoryText>
    </>
  )
}

export default HowMiningWorks
