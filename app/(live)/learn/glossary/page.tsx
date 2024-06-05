import React from 'react'
import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'

const BitcoinMiningGlossaryPage: React.FC = () => {
  return (
    <main className="flex-1 p-4 md:p-8">
      <LearnCategoryTitle>Bitcoin Mining Glossary</LearnCategoryTitle>

      <LearnCategorySubTitle>ASIC (Application-Specific Integrated Circuit)</LearnCategorySubTitle>
      <LearnCategoryText>
        A specialized type of hardware designed exclusively for mining Bitcoin. ASICs are tailored to compute SHA-256 hashing problems with
        greater efficiency than general-purpose computers, significantly increasing the profitability of mining operations by maximizing
        computational power while minimizing energy consumption.
      </LearnCategoryText>

      <LearnCategorySubTitle>Bitcoin Node</LearnCategorySubTitle>
      <LearnCategoryText>
        A software client that participates in the Bitcoin network by verifying transactions and blocks according to the consensus rules.
        Nodes help enforce the rules of the protocol, providing a way to independently and objectively verify the blockchain integrity
        without relying on third parties.
      </LearnCategoryText>

      <LearnCategorySubTitle>Block</LearnCategorySubTitle>
      <LearnCategoryText>
        A package of Bitcoin transaction data that is permanently recorded on the blockchain. Each block includes a reference to the
        previous block, linking them in a chronological chain. Blocks are mined approximately every 10 minutes.
      </LearnCategoryText>

      <LearnCategorySubTitle>Block Header</LearnCategorySubTitle>
      <LearnCategoryText>
        The leading section of a Bitcoin block that contains metadata essential for the network's operation. This includes the previous
        block's hash, a timestamp, the nonce, and the difficulty target, all of which are crucial for maintaining the blockchain's integrity
        and chronological order.
      </LearnCategoryText>

      <LearnCategorySubTitle>Block Reward</LearnCategorySubTitle>
      <LearnCategoryText>
        The incentive awarded to miners who successfully solve the cryptographic puzzle necessary to add a new block to the blockchain. This
        reward consists of newly minted bitcoins and transaction fees from the transactions included in the block. The block reward halves
        approximately every four years, an event known as "halving."
      </LearnCategoryText>

      <LearnCategorySubTitle>Block Reorg</LearnCategorySubTitle>
      <LearnCategoryText>
        Short for "blockchain reorganization," this refers to the event when the Bitcoin network replaces the current blockchain with a
        longer one, usually because more proof of work has been demonstrated on the alternative chain. A reorg can invalidate previously
        confirmed blocks and transactions, which is rare and typically occurs only a few blocks deep.
      </LearnCategoryText>

      <LearnCategorySubTitle>Difficulty</LearnCategorySubTitle>
      <LearnCategoryText>
        A variable that reflects how hard it is to mine a block. This metric adjusts approximately every two weeks to maintain a target
        block time of ten minutes. The difficulty increases with more hashing power to ensure the blockchain's security and predictable
        creation rate of new blocks.
      </LearnCategoryText>

      <LearnCategorySubTitle>Difficulty Adjustment</LearnCategorySubTitle>
      <LearnCategoryText>
        The automatic process of changing the mining difficulty of new blocks in response to changes in network hashing power. This
        adjustment occurs every 2,016 blocks. It ensures that the time to find a new block remains about ten minutes on average, regardless
        of the number of miners or the technological advancements in mining hardware.
      </LearnCategoryText>

      <LearnCategorySubTitle>Double Spending</LearnCategorySubTitle>
      <LearnCategoryText>
        An attempt by a user to spend the same bitcoins more than once. The Bitcoin network prevents this by confirming which transaction
        was first broadcast to the network, thereby invalidating the later attempt(s) to spend the same bitcoins.
      </LearnCategoryText>

      <LearnCategorySubTitle>Fork</LearnCategorySubTitle>
      <LearnCategoryText>
        A change in the Bitcoin protocol that creates two diverging paths, either as a soft fork or a hard fork. A soft fork makes previous
        valid blocks invalid, and a hard fork makes previously invalid blocks valid. Forks require consensus from the network and are used
        to upgrade and improve the protocol.
      </LearnCategoryText>

      <LearnCategorySubTitle>Genesis Block</LearnCategorySubTitle>
      <LearnCategoryText>
        The very first block in the Bitcoin blockchain. It was mined by Satoshi Nakamoto in 2009 and contains a reference to a newspaper
        headline: "Chancellor on the brink of second bailout for banks"
      </LearnCategoryText>

      <LearnCategorySubTitle>Halving</LearnCategorySubTitle>
      <LearnCategoryText>
        An event that reduces the block reward given to Bitcoin miners by half every 210,000 blocks. Halving helps control Bitcoin's
        inflation rate and its circulating supply, ensuring that the total supply of 21 million bitcoins will be reached around the year
        2140.
      </LearnCategoryText>

      <LearnCategorySubTitle>Hard Fork</LearnCategorySubTitle>
      <LearnCategoryText>
        A type of protocol upgrade that validates previously invalid transactions or blocks. Hard forks require all nodes to upgrade to the
        new protocol to avoid splitting the network into two incompatible chains. They are often used for major enhancements that cannot be
        implemented with a soft fork.
      </LearnCategoryText>

      <LearnCategorySubTitle>Hash Rate</LearnCategorySubTitle>
      <LearnCategoryText>
        The total computational speed at which a Bitcoin mining network operates. It is a measure of the performance of all miners combined,
        expressed in hashes per second. The hash rate indicates the health and security of the network; higher rates make the network more
        resistant to attacks.
      </LearnCategoryText>

      <LearnCategorySubTitle>Merkle Tree</LearnCategorySubTitle>
      <LearnCategoryText>
        A data structure used in Bitcoin that summarizes all the transactions in a block into a single digital fingerprint. Each transaction
        is hashed, the hashes are then paired, hashed, paired again, and hashed again until a single hash remains, known as the Merkle root,
        which is included in the block header.
      </LearnCategoryText>

      <LearnCategorySubTitle>Mining Pool</LearnCategorySubTitle>
      <LearnCategoryText>
        A collective group of Bitcoin miners who combine their computational resources over a network to increase their chances of finding a
        block and earning the block reward. The reward is then divided among the pool members proportionally to the amount of hashing power
        each contributed.
      </LearnCategoryText>

      <LearnCategorySubTitle>Mining Rig</LearnCategorySubTitle>
      <LearnCategoryText>
        A custom-built computer specifically designed for mining bitcoins. Typically, a rig includes multiple high-performance ASICs to
        maximize the potential of mining operations.
      </LearnCategoryText>

      <LearnCategorySubTitle>Nonce</LearnCategorySubTitle>
      <LearnCategoryText>
        A variable part of the block header that miners change to produce a block hash that meets the network's difficulty target. The nonce
        is a critical component of Bitcoin's proof of work algorithm. Historically, the nonce is what miners increment to attempt different
        hash combinations in order to find a valid block.
      </LearnCategoryText>

      <LearnCategorySubTitle>Orphan Block</LearnCategorySubTitle>
      <LearnCategoryText>
        Blocks that are not accepted into the blockchain network because another block at the same height in the chain had its hash
        completed faster and was accepted first. Orphan blocks occur naturally when two miners produce blocks at similar times.
      </LearnCategoryText>

      <LearnCategorySubTitle>Proof of Work (PoW)</LearnCategorySubTitle>
      <LearnCategoryText>
        The algorithm used to validate transactions and mine new blocks. PoW requires miners to solve a complex mathematical problem, which
        helps in securing the network and verifying transactions without needing a central authority.
      </LearnCategoryText>

      <LearnCategorySubTitle>Rare Sats</LearnCategorySubTitle>
      <LearnCategoryText>
        Refers to unique or distinctive satoshis (the smallest unit of bitcoin) that can have additional value due to their rarity or unique
        characteristics, such as being part of an ordinal inscription. This concept has gained popularity with the advent of the Ordinals
        protocol, which allows data or digital artifacts to be inscribed directly onto individual satoshis.
      </LearnCategoryText>

      <LearnCategorySubTitle>Satoshi Nakamoto</LearnCategorySubTitle>
      <LearnCategoryText>
        The pseudonymous creator(s) of Bitcoin, who authored the original white paper and developed the first blockchain database. The true
        identity of Satoshi Nakamoto remains unknown.
      </LearnCategoryText>

      <LearnCategorySubTitle>SHA-256</LearnCategorySubTitle>
      <LearnCategoryText>
        A cryptographic hash function that converts an input of any size into a fixed 256-bit output. Utilized by Bitcoin, this function is
        fundamental in processing transactions, mining new blocks, and enhancing the security of the blockchain.
      </LearnCategoryText>

      <LearnCategorySubTitle>Soft Fork</LearnCategorySubTitle>
      <LearnCategoryText>
        A backward-compatible method of upgrading the Bitcoin blockchain. It makes previously valid blocks invalid and requires only a
        majority of the miners to upgrade to enforce the new rules.
      </LearnCategoryText>

      <LearnCategorySubTitle>Stratum Protocol</LearnCategorySubTitle>
      <LearnCategoryText>
        A protocol used by mining pools to improve the efficiency of mining operations. It allows miners to retrieve jobs from mining pool
        servers, contributing to more effective and reliable mining activities.
      </LearnCategoryText>

      <LearnCategorySubTitle>Stratum v1</LearnCategorySubTitle>
      <LearnCategoryText>
        The first version of the Stratum protocol, which helps reduce internet bandwidth usage for miners and improves the efficiency of the
        mining process by better managing the data sent between miners and pool servers.
      </LearnCategoryText>

      <LearnCategorySubTitle>Stratum v2</LearnCategorySubTitle>
      <LearnCategoryText>
        An enhancement of the original Stratum protocol, Stratum v2 introduces features such as increased security, reduced bandwidth usage,
        and greater decentralization capabilities by allowing miners to choose their own transaction sets for inclusion in blocks.
      </LearnCategoryText>

      <LearnCategorySubTitle>Transaction</LearnCategorySubTitle>
      <LearnCategoryText>
        An action encoded into data that is broadcast to the network and collected into blocks. A transaction typically represents a
        transfer of value between Bitcoin wallets and is secured by digital signatures.
      </LearnCategoryText>

      <LearnCategorySubTitle>Transaction Fee</LearnCategorySubTitle>
      <LearnCategoryText>
        A fee included with each Bitcoin transaction that incentivizes miners to include the transaction in their block. Fees vary based on
        the transaction size and network conditions.
      </LearnCategoryText>

      <LearnCategorySubTitle>51% Attack</LearnCategorySubTitle>
      <LearnCategoryText>
        A scenario in which a group or an entity gains control of more than half of the total hash rate, enabling them to potentially
        reverse transactions and double-spend coins. This level of control can compromise the security and integrity of the blockchain,
        though it is extremely costly and difficult to achieve in Bitcoin due to its large network size.
      </LearnCategoryText>
    </main>
  )
}

export default BitcoinMiningGlossaryPage
