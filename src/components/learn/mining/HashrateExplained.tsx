import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'

const HashrateExplained = () => {
  return (
    <>
      <LearnCategoryTitle>Hashrate Explained</LearnCategoryTitle>

      <LearnCategoryText>
        In the bitcoin space, "hashrate" refers to the computational power used to mine and process transactions on the bitcoin blockchain,
        measured in hashes per second (H/s). Like the horsepower in a car, more hashrate means more computational guesses can be made every
        second, increasing the chances of finding the fingerprint - aka “hash” - required to mine a block in bitcoin.
      </LearnCategoryText>

      <LearnCategorySubTitle>What is Hashrate?</LearnCategorySubTitle>
      <LearnCategoryText>
        Hashrate is essentially the engine power of Bitcoin mining. While mining could be done on your computer in the early days of
        bitcoin, it now requires a special purpose ASIC mining rig to produce large amounts of hashes. These hashes are the Proof of Work
        (PoW) used to secure the bitcoin network - see How Mining Works for more details.
      </LearnCategoryText>

      <LearnCategoryText>
        The SHA-256 algorithm, a part of the Secure Hash Algorithm 2 family, is used by Bitcoin to compress transaction data into a compact
        format, requiring a hash output that starts with a certain number of zeros. As you can imagine, it takes many, many, *many* hashes
        to find one that begins with a sufficient number of leading zeros. The process of hashing incorporates a number used once (nonce)
        and timestamp, along with transaction data, to diversify the guesses.
      </LearnCategoryText>

      <LearnCategoryText>
        The number of leading zeros is determined by the mining difficulty - the difficulty is calibrated so that, on average, new blocks
        are found every 10 minutes.
      </LearnCategoryText>

      <LearnCategorySubTitle>The Background of SHA-256</LearnCategorySubTitle>
      <LearnCategoryText>
        The SHA-256 algorithm is at the heart of Bitcoin's operation. Developed by the National Security Agency (NSA) of the United States,
        SHA-256 is part of the SHA-2 family of cryptographic hash functions designed to provide a high level of security. Its selection for
        Bitcoin by Satoshi Nakamoto was no accident; SHA-256 provides the robustness needed to secure financial transactions on a global
        scale.
      </LearnCategoryText>

      <LearnCategorySubTitle>History of Mining</LearnCategorySubTitle>
      <LearnCategoryText>
        In the early days, mining could be measured in Hashes/second (H/s) or Kilohashes/second (KH/s) - now it is measured in
        Terahashes/second (TH/s) and up. The evolution of Bitcoin mining can be segmented into several eras, each marked by significant
        technological advancements and changes in mining practices - learn more.
      </LearnCategoryText>

      <LearnCategorySubTitle>Hashpower Measurement</LearnCategorySubTitle>
      <LearnCategoryText>
        Here’s a quick look at the scales of hashpower:
        <br />1 Hash (H/s) - 1
        <br />1 Kilohash - 1,000 (10^3)
        <br />1 Megahash - 1,000,000 (10^6)
        <br />1 Gigahash - 1,000,000,000 (10^9)
        <br />1 Terahash - 1,000,000,000,000 (10^12)
        <br />1 Petahash - 1,000,000,000,000,000 (10^15)
        <br />1 Exahash - 1,000,000,000,000,000,000 (10^18)
      </LearnCategoryText>

      <LearnCategorySubTitle>Hashrate: the heartbeat of bitcoin mining</LearnCategorySubTitle>
      <LearnCategoryText>
        Hashrate is the heartbeat of Bitcoin mining, reflecting the health and security of the Bitcoin network. Understanding hashrate, the
        role of SHA-256, and the proof of work mechanism is fundamental to participating in the mining process. Rigly enables participants
        to manage their hashpower more effectively, paving the way for more efficient and accessible Bitcoin mining.
        <p>
          {' '}
          <b>Fun Fact:</b> The global network hashrate of Bitcoin is currently over 600 EH/s!
        </p>
      </LearnCategoryText>
    </>
  )
}

export default HashrateExplained
