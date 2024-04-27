import ProImage1 from 'src/images/pro-img1.png'
import TeamMemberCard from './TeamMemberCard'
import sydney from 'src/assets/jpg/sydney.jpeg'
import kevin from 'src/assets/png/kevin.png'
import evan from 'src/assets/webp/evan.webp'
import jonas from 'src/assets/webp/jonas.webp'
import nico from 'src/assets/webp/nico.webp'
import asher from 'src/assets/jpg/asher.jpg'
import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'

const OurStory = () => {
  return (
    <>
      <article>
        <LearnCategoryTitle>Our Story</LearnCategoryTitle>

        <LearnCategoryText>
          Our journey began in 2021 with a research project on sustainable bitcoin mining in Africa, backed by Chaincode Labs. The idea was
          simple: learn how bitcoin mining could pay for new energy assets. Our goal was straightforward: use the income generated from
          Bitcoin mining to offset the costs of the solar power used to operate the rigs.
        </LearnCategoryText>

        <LearnCategoryTextWithImage
          text="Through this project, we quickly grasped the complexities involved in Bitcoin mining - acquiring hardware, securing cost-effective power, and the overall setup were daunting tasks."
          image={ProImage1}
          imageAlt="Solar-powered S9 in Zimbabwe"
          imagePosition="right"
        />

        <LearnCategoryText>
          As we delved deeper, we identified a pivotal inefficiency in the ecosystem -{' '}
          <b>Bitcoin mining was unnecessarily centralized around ownership of physical hardware</b>. This is to say, you had to have an ASIC
          mining rig (and cheap electricity!) to participate in mining.
        </LearnCategoryText>

        <LearnCategoryText>
          It was from these challenges that the idea for Rigly was born - a marketplace where bitcoiners could simply buy Bitcoin mining
          hashrate, bypassing the complexities of mining. We thought &quot;Rigly&quot; was a catchy name that played on the word "rig", and
          it stuck.
        </LearnCategoryText>

        <LearnCategorySubTitle>Don&apos;t trust, verify</LearnCategorySubTitle>
        <LearnCategoryText>
          Evan started developing the first version of the marketplace in 2022. He purchased a mining rig in Texas with the company we
          worked with in our African project. However, within just 24 hours, the rig disappeared—a stark introduction to the notorious
          &quot;rug pulls&quot; that plague the Bitcoin mining industry.
        </LearnCategoryText>

        <LearnCategoryTextWithImage
          text="This incident occurred amidst a large drop in the bitcoin price, further complicating matters as the hosting company went out of business. It was a lesson that rug pulls can happen even with companies you trust."
          image={ProImage1}
          imageAlt="Hey, where's my hashrate?"
          imagePosition="left"
        />

        <LearnCategoryText>
          This experience underscored <b>the need for a system that protected buyers from fraud</b>. Jonas proposed an escrow using on-chain
          multisig technology. This setup ensured that buyers&apos; funds were held in escrow until the hashrate they purchased was
          verifiably delivered, a model we now call <b>&quot;Trustless Mining&quot;</b>.
        </LearnCategoryText>

        <LearnCategorySubTitle>Building an Auction Marketplace</LearnCategorySubTitle>
        <LearnCategoryText>
          The practical implementation of our idea began modestly - with Evan creating a simple auction site for Rigly using Shopify. It was
          here that Nico joined the team, bringing insights into what mining farms sought in a marketplace and identifying the unique needs
          of both buyers and sellers. The decision to adopt an auction format came when we recognized that hashrate to mine new blocks was a
          scarce resource. An auction model proved to be the most effective way to ensure fair price discovery.
        </LearnCategoryText>

        <LearnCategoryText>
          With a clear vision of our marketplace model, Nico and Evan expanded the team, bringing on board Asher, Kevin, and Tobi to develop
          the Rigly platform further. Together, they transformed Rigly into a pioneering marketplace for Bitcoin mining hashrate, focusing
          on transparency, security, and bringing the spirit of "one cpu, one vote" back to the bitcoin network.
        </LearnCategoryText>

        <LearnCategoryTitle>Team Rigly</LearnCategoryTitle>
        <LearnCategorySubTitle>It takes teamwork to make Rigly work</LearnCategorySubTitle>
        <ul
          role="list"
          className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none xl:grid-cols-3 xl:gap-8"
        >
          <TeamMemberCard
            image={evan}
            name="Evan Baer"
            description="Evan iterates on Rigly each day. Previously he led the R&D infrastructure group at a global trading firm. In his early career, he built one of the first internet providers in Australia. He has a passion for bitcoin mining."
          />
          <TeamMemberCard
            image={nico}
            name="Nico Preti"
            description="Nico grows Rigly each day. Previously he managed communications for Poolin and btc.com. He is a long-time writer in the bitcoin space and participant in the bitcoin network."
          />
          <TeamMemberCard
            image={jonas}
            name="Adam Jonas"
            description="Jonas spearheads educational initiatives and brings things to life at Chaincode Labs. He previously worked as an engineer in the education space after transitioning from his former role developing the talents of professional baseball players. His preferred nonce is 42."
          />
          <TeamMemberCard
            image={kevin}
            name="Kevin Karsopawiro"
            description="Kevin is an experienced software engineer with over a decade of industry experience. Prior to joining Rigly, he spearheaded the development of multiple high-frequency cryptocurrency exchanges. His experience from these endeavors allow him to deliver innovative solutions for Rigly."
          />
          <TeamMemberCard
            image={asher}
            name="Asher Pembroke"
            description="Asher is an experienced Postdoctoral Researcher with a demonstrated history of working in the Research industry. Skilled in Mathematical Modeling, Python, data analysis and visualization, he is a strong research professional with a Doctorate of Philosophy focused in Space Weather Modeling from Rice University."
          />
          <TeamMemberCard
            image={sydney}
            name="Sydney Bright"
            description="Sydney is an avid bitcoin enthusiast who manages Rigly's operations. He has followed Bitcoin since young adulthood. Prior to joining Rigly, Sydney amassed valuable experience as an engineer in various startups within the medical device industry. Nevertheless, he made a conscious choice to diverge from that career trajectory, redirecting his efforts exclusively towards his true passions—Bitcoin and his writing."
          />
        </ul>
      </article>
    </>
  )
}

export default OurStory
