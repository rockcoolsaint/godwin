import ProImage1 from 'src/images/pro-img1.png'
import Zim from 'src/images/zimbabwe.png'
import Rugged from 'src/images/rugged.jpg'
import Shopify from 'src/images/shopify_site.png'
import TeamMemberCard from './TeamMemberCard'
import sydney from 'src/assets/jpg/sydney.jpeg'
import kevin from 'src/assets/png/kevin.png'
import evan from 'src/assets/webp/evan.webp'
import jonas from 'src/assets/webp/jonas.webp'
import nico from 'src/assets/webp/nico.webp'
import asher from 'src/assets/jpg/asher.jpg'
import sasa from 'src/assets/jpg/sasa.jpg'
import placeholder from 'src/assets/jpg/placeholder.jpg'
import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'

const OurStory = () => {
  return (
    <>
      <article>
        <LearnCategoryTitle>Our Story</LearnCategoryTitle>

        
        <LearnCategorySubTitle>How it started</LearnCategorySubTitle>
        <LearnCategoryText>
          Our journey began in early 2022 with a research project on <b>sustainable bitcoin mining</b> in Africa, backed by <a href="https://chaincode.com">Chaincode Labs</a>. The idea was
          simple: learn how bitcoin mining could pay for new energy assets. Our goal was to use the income generated from
          Bitcoin mining to offset the cost of solar panels used to power the rigs.
        </LearnCategoryText>

        <LearnCategoryTextWithImage
          text="Through this project, we learned all about the complexities involved in Bitcoin mining: <b>buying hardware</b>, <b>securing cost-effective power</b>, <b>keeping the hardware online</b>, etc.
          As we delved deeper, we identified a pivotal inefficiency in the ecosystem: <b>Bitcoin mining was unnecessarily centralized around owning physical hardware</b>. This is to say, you had to have an ASIC
          mining rig (and cheap electricity!) to participate in mining."
          image={Zim}
          imageAlt="Zimbabwe"
          imagePosition="right"
        />

        <LearnCategoryText>
          This was a <b>huge blocker</b> preventing all but <b>the most dedicated bitcoiners</b> from participating in mining. It was from this challenge that the idea for Rigly was born - a marketplace where bitcoiners could simply buy 
          hashrate and start mining.
        </LearnCategoryText>

        <LearnCategoryText>
        We thought &quot;Rigly&quot; was a catchy name that played on mining "rig", and we registered the domain and got to work.
        </LearnCategoryText>
        <LearnCategorySubTitle>Don&apos;t trust, verify</LearnCategorySubTitle>
        <LearnCategoryText>
          Evan started developing the first version of the marketplace in the Spring of 2022. He purchased a mining rig in Texas with the company we
          worked with in our African project. However, within just 24 hours, <b>the rig disappeared</b>—a stark introduction to the notorious
          &quot;rug pulls&quot; that plague the Bitcoin mining industry.
        </LearnCategoryText>

        <LearnCategoryTextWithImage
          text="This incident occurred amidst a large drop in the bitcoin price, further complicating matters as the hosting company went out of business. It was a lesson that <b>rug pulls</b> can happen <b>even with companies you trust</b>."
          image={Rugged}
          imageAlt="Hey, where's my hashrate?"
          imagePosition="left"
        />

        <LearnCategoryText>
          This experience underscored <b>the need for a system that protected buyers from fraud</b>. Jonas proposed an escrow using on-chain
          multisig technology. This setup ensured that buyers&apos; funds were held in escrow until the hashrate they purchased was
          verifiably delivered, a model we now call <b>&quot;Trustless Mining&quot;</b>.
        </LearnCategoryText>

        <LearnCategorySubTitle>Building an Auction Marketplace</LearnCategorySubTitle>

        <LearnCategoryTextWithImage
          text="The practical implementation of our idea began modestly - with Evan creating a <b>simple auction site</b> for Rigly using Shopify.
          Around this time, <b>Nico</b> joined and brought <b>new insights</b> into the <b>unique needs of mining farms</b> and how to get the marketplace started. "
          image={Shopify}
          imageAlt="The first version of Rigly"
          imagePosition="right"
        />

        <LearnCategoryText>
          The decision to adopt an auction format came when we recognized that <b>hashrate to mine new blocks</b> was a <b>scarce resource</b>.
          An auction model proved to be the most effective way to ensure <b>fair price discovery</b>.
        </LearnCategoryText>

        <LearnCategoryText>
          With a clear vision of our marketplace model, <b>Nico and Evan</b> expanded the team, bringing on board Asher, Kevin, and Tobi to develop
          the Rigly platform further. Together, they transformed Rigly into a pioneering marketplace for Bitcoin mining hashrate, focusing
          on transparency, security, and bringing the spirit of <b>"one cpu, one vote"</b> back to the bitcoin network.
        </LearnCategoryText>

        <LearnCategoryTitle>Team Rigly</LearnCategoryTitle>
        <LearnCategorySubTitle center>It takes teamwork to make Rigly work</LearnCategorySubTitle>
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

          <TeamMemberCard
            image={sasa}
            name="Saša Buklijaš"
            description="Saša is responsible for our stratum hashrate proxy, which routes hashrate from mining farms around the world."
          />
          <TeamMemberCard
            image={placeholder}
            name="Andrew Meisel"
            description="Andrew was Rigly's 10th customer when it was still running on Shopify. He handles Rigly communications and outreach."
          />
        </ul>
      </article>
    </>
  )
}

export default OurStory
