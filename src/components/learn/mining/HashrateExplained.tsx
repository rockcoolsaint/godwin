import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import Image from 'next/image'
import HashExample from 'src/images/hash_example.png'
import BlockHash from 'src/images/block_hash.png'

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

      <div className="my-6 flex justify-center">
        <Image src={HashExample} alt="Hash Example" />
      </div>

      <LearnCategoryText>
        The SHA-256 algorithm, a part of the Secure Hash Algorithm 2 family, is used by Bitcoin to compress transaction data into a compact
        format, requiring a hash output that starts with a certain number of zeros. As you can imagine, it takes many, many, *many* hashes
        to find one that begins with a sufficient number of leading zeros. The process of hashing incorporates a number used once (nonce)
        and timestamp, along with transaction data, to diversify the guesses.
      </LearnCategoryText>

      <div className="my-6 flex justify-center">
        <Image src={BlockHash} alt="Block hash Example" />
      </div>

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
      <LearnCategoryText>Here’s a quick look at the scales of hashpower:</LearnCategoryText>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table style={{ borderCollapse: 'collapse' }}>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>
              <strong>Hash power</strong>
            </th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>
              <strong>Hash/sec record</strong>
            </th>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>1 Hash (H/s)</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>1</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>1 Kilohash</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>1000 (10^3)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>1 Megahash</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>1,000,000 (10^6)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>1 Gigahash</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>1,000,000,000 (10^9)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>1 Terahash</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>1,000,000,000,000 (10^12)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>1 Petahash</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>1,000,000,000,000,000 (10^15)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '8px' }}>1 Exahash</td>
            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>1,000,000,000,000,000,000 (10^18)</td>
          </tr>
        </table>
      </div>

      <LearnCategorySubTitle>Hashrate: the heartbeat of bitcoin mining</LearnCategorySubTitle>
      <LearnCategoryText>
        Hashrate is the heartbeat of Bitcoin mining, reflecting the health and security of the Bitcoin network. Understanding hashrate, the
        role of SHA-256, and the proof of work mechanism is fundamental to participating in the mining process. Rigly enables participants
        to manage their hashpower more effectively, paving the way for more efficient and accessible Bitcoin mining.
      </LearnCategoryText>
    </>
  )
}

export default HashrateExplained
