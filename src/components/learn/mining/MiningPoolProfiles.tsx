import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'

const MiningPoolProfiles = () => {
  return (
    <>
      <LearnCategoryTitle>Mining Pool Profiles</LearnCategoryTitle>

      <LearnCategoryText>Once you buy hashrate, you need to send it to a mining pool to earn bitcoin.</LearnCategoryText>
      <LearnCategorySubTitle>Which pool to use?</LearnCategorySubTitle>
      <LearnCategoryText>
        You are free to send hashrate to any mining pool supporting stratum v1. Many Rigly customers use Braiins, Luxor, and Ocean mining
        pools. If you want to try solo mining, we suggest CKPool -{' '}
        <a href="https://solo.ckpool.org" className="text-blue-500 hover:text-blue-700">
          solo.ckpool.org
        </a>
        .
      </LearnCategoryText>

      <LearnCategorySubTitle>United States</LearnCategorySubTitle>
      <LearnCategoryText>
        <strong>Luxor Mining Pool</strong>
        <br />
        Luxor is known for providing a transparent and technology-driven mining approach. They were also an early supporter of Ordinals.
        <br />
        Payout Format: FPPS
        <br />
        URL:{' '}
        <a href="https://www.luxor.tech" className="text-blue-500 hover:text-blue-700">
          www.luxor.tech
        </a>
      </LearnCategoryText>

      <LearnCategoryText>
        <strong>Ocean Mining</strong>
        <br />
        New pool started by longtime bitcoin-core developer Luke-jr.
        <br />
        Payout Format: Tides (similar to PPLNS)
        <br />
        URL:{' '}
        <a href="https://ocean.xyz" className="text-blue-500 hover:text-blue-700">
          ocean.xyz
        </a>
      </LearnCategoryText>

      <LearnCategoryText>
        <strong>Lincoin</strong>
        <br />
        Lincoin is a newer mining pool with a focus on integration with grid service providers (REPs, CSPs and QSEs).
        <br />
        Payout Format: FPPS
        <br />
        URL:{' '}
        <a href="https://lincoin.com" className="text-blue-500 hover:text-blue-700">
          lincoin.com
        </a>
      </LearnCategoryText>

      <LearnCategoryText>
        <strong>Foundry Pool</strong>
        <br />
        Backed by Foundry Digital, a Digital Currency Group company, it has quickly become one of the top mining pools globally. They serve
        large mining farms. Individual miners are not allowed to use this pool.
        <br />
        Payout Format: FPPS
        <br />
        URL:{' '}
        <a href="https://foundryusa.com" className="text-blue-500 hover:text-blue-700">
          foundryusa.com
        </a>
      </LearnCategoryText>

      <LearnCategorySubTitle>Europe</LearnCategorySubTitle>
      <LearnCategoryText>
        <strong>Braiins Pool (formerly Slush Pool)</strong>
        <br />
        Based in the Czech Republic, Braiins was the first-ever mining pool and introduced the concept of pooled mining to the Bitcoin
        community.
        <br />
        Payout Format: FPPS (recently moved away from PPLNS)
        <br />
        URL:{' '}
        <a href="https://braiins.com/pool" className="text-blue-500 hover:text-blue-700">
          braiins.com/pool
        </a>
      </LearnCategoryText>

      <LearnCategoryText>
        <strong>Binance Pool</strong>
        <br />
        This pool is part of the Binance ecosystem, based in Malta but operates globally.
        <br />
        Payout Format: FPPS
        <br />
        URL:{' '}
        <a href="https://pool.binance.com" className="text-blue-500 hover:text-blue-700">
          pool.binance.com
        </a>
      </LearnCategoryText>

      <LearnCategorySubTitle>China / Asia</LearnCategorySubTitle>
      <LearnCategoryText>
        <strong>AntPool</strong>
        <br />
        Based in China, AntPool is one of the largest Bitcoin mining pools. Managed by Bitmain Technologies, the manufacturer of ASIC mining
        hardware.
        <br />
        Payout Format: FPPS or PPLNS
        <br />
        URL:{' '}
        <a href="https://www.antpool.com" className="text-blue-500 hover:text-blue-700">
          antpool.com
        </a>
      </LearnCategoryText>
      <LearnCategoryText>
        <strong>F2Pool</strong>
        <br />
        F2Pool operates from China but serves miners globally. It started in 2013 and has grown into one of the oldest and most reliable
        mining pools.
        <br />
        Payout Format: FPPS or PPLNS
        <br />
        URL:{' '}
        <a href="https://www.f2pool.com" className="text-blue-500 hover:text-blue-700">
          f2pool.com
        </a>
      </LearnCategoryText>
      <LearnCategoryText>
        <strong>BTC.com</strong>
        <br />
        It’s btc.com. Old school.
        <br />
        Payout Format: FPPS
        <br />
        URL:{' '}
        <a href="https://pool.btc.com" className="text-blue-500 hover:text-blue-700">
          pool.btc.com
        </a>
      </LearnCategoryText>
      <LearnCategoryText>
        <strong>Poolin</strong>
        <br />
        Poolin was founded by former employees of BTC.com. In the past it was one of the largest pools in the world. They encountered issues
        in 2022 and halted withdrawals, thus it isn’t recommended to use Poolin at this time.
        <br />
        Payout Format: FPPS and PPLNS
        <br />
        URL:{' '}
        <a href="https://www.poolin.com" className="text-blue-500 hover:text-blue-700">
          poolin.com
        </a>
      </LearnCategoryText>
      <LearnCategoryText>
        <strong>ViaBTC</strong>
        <br />
        Established in 2016 and quickly became known for user-friendly services.
        <br />
        Payout Format: PPS+, PPLNS and solo
        <br />
        URL:{' '}
        <a href="https://www.viabtc.com" className="text-blue-500 hover:text-blue-700">
          viabtc.com
        </a>
      </LearnCategoryText>
      <LearnCategorySubTitle>Smaller Pools</LearnCategorySubTitle>
      <LearnCategoryText>
        <strong>CKPool</strong>
        <br />
        Created and operated by Con Kolivas, creator of cgminer. CKPool is a special pool dedicated to solo mining.
        <br />
        Payout Format: solo
        <br />
        URL:{' '}
        <a href="https://ckpool.dev" className="text-blue-500 hover:text-blue-700">
          ckpool.dev
        </a>
      </LearnCategoryText>

      <LearnCategoryText>
        <strong>KanoPool</strong>
        <br />
        Started in 2014 and known for a no-frills mining experience and a community-oriented approach.
        <br />
        Payout Format: PPLNS
        <br />
        URL:{' '}
        <a href="https://www.kano.is" className="text-blue-500 hover:text-blue-700">
          www.kano.is
        </a>
      </LearnCategoryText>
    </>
  )
}

export default MiningPoolProfiles
