import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'

const MiningDifficulty = () => {
  return (
    <>
      <LearnCategoryTitle>Mining Difficulty</LearnCategoryTitle>

      <LearnCategoryText>
        Network difficulty in Bitcoin refers to the measure of how difficult it is to find a hash below a given target. The difficulty
        adjusts itself automatically every 2,016 blocks in order to maintain a constant block time, regardless of the total hashing power on
        the network. This difficulty adjustment ensures that blocks are mined, on average, every 10 minutes.
      </LearnCategoryText>

      <LearnCategorySubTitle>Background</LearnCategorySubTitle>
      <LearnCategoryText>
        The concept of mining difficulty is fundamental to Bitcoin's design, as outlined by Satoshi Nakamoto in the Bitcoin white paper. The
        mechanism was introduced to create a stable and secure issuance rate of new bitcoins into the system, regardless of fluctuations in
        the compute power deployed by miners.
      </LearnCategoryText>
      <LearnCategoryText>
        {' '}
        The difficulty adjustment algorithm helps in preserving the integrity and predictability of Bitcoin's monetary policy.
      </LearnCategoryText>

      <LearnCategorySubTitle>Impact on Mining</LearnCategorySubTitle>
      <LearnCategoryText>
        Difficulty directly affects Proof of Work (PoW) mining by influencing the probability of mining a new block. As more miners join the
        network and deploy more computing power, the difficulty increases, making it harder for individual miners to find the next block.
      </LearnCategoryText>
      <LearnCategoryText>
        Conversely, if computational power decreases, the difficulty drops, making mining easier. This dynamic adjustment helps in keeping
        the network both secure and functional.
      </LearnCategoryText>
      <LearnCategorySubTitle>The Goal: 10 Minute Block Times</LearnCategorySubTitle>
      <LearnCategoryText>
        The target of maintaining a 10-minute interval between each block is crucial for several reasons. It allows the network sufficient
        time to propagate blocks and reduce the likelihood of forks, thus maintaining network cohesion. Furthermore, this interval helps in
        balancing transaction confirmation times with the efficiency of the network. It’s a critical parameter that helps ensure that the
        blockchain runs smoothly and remains decentralized.
      </LearnCategoryText>

      <LearnCategorySubTitle>Fair and Balanced</LearnCategorySubTitle>
      <LearnCategoryText>
        The difficulty adjustment mechanism also plays a crucial role in the distribution of new bitcoins. By regulating the mining process
        to a steady and predictable pace, it ensures that bitcoins are not mined too quickly or slowly, regardless of the number of miners
        or the amount of computing power they wield. This stability is vital for maintaining the economic principles set forth in Bitcoin's
        creation, ensuring a fair and predictable issuance of new coins to the miners who help secure the network.
      </LearnCategoryText>

      <LearnCategorySubTitle>Difficulty Adjustments Over Time</LearnCategorySubTitle>
      <LearnCategoryText>
        Since Bitcoin's inception, there have been numerous adjustments to the mining difficulty. These adjustments are a direct response to
        changes in the network’s total hashing power. Examples:
        <ul className="ml-5 list-disc">
          <li>More efficient hardware (Introduction of ASIC miners)</li>
          <li>Regulatory changes (China Mining Ban)</li>
          <li>Power cost fluctuations (Texas in the summer!)</li>
          <li>Steady addition of bitcoin miners (more hashrate comes online all the time)</li>
        </ul>
      </LearnCategoryText>
      <LearnCategoryText>
        Each adjustment helps the Bitcoin network remain agile and responsive to changes in the external world.
      </LearnCategoryText>
    </>
  )
}

export default MiningDifficulty
