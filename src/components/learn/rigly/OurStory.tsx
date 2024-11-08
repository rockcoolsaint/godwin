import ProImage1 from 'src/images/pro-img1.png'
import Zim from 'src/images/zimbabwe.png'
import Rugged from 'src/images/rugged.jpg'
import Shopify from 'src/images/shopify_site.png'
import TeamMemberCard from './TeamMemberCard'
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
          Rigly began in 2022 with a project in Africa, exploring how Bitcoin mining could fund new energy sources. The idea was simple: use Bitcoin mining to offset solar panel costs. I learned all about mining’s challenges—hardware, power, uptime—and realized that mining is totally centralized around owning rigs.
        </LearnCategoryText>

        <LearnCategoryText>
          This led to a vision - a marketplace where bitcoiners could buy hashrate and start mining on rigs from around the world, without owning hardware. I went further down the mining rabbit hole..
        </LearnCategoryText>
        <LearnCategoryTextWithImage
          text="Mining ain't easy. You find or create cheap power, buy rigs and hope they arrive ok, and then somehow keep them running. I got one s9 up and running in Zimbabwe. Just one."
          image={Zim}
          imageAlt="Zimbabwe"
          imagePosition="right"
        />

        <LearnCategorySubTitle>Don’t trust, verify</LearnCategorySubTitle>
        <LearnCategoryText>
          Full of this vision, I was feeling inspired and so I bought an S19 with a hosting company in Texas, but within 24 hours, it vanished - I was rugged. That was the worst. I was like "you can't trust these people, they'll just rip off buyers on the marketplace", and then Jonas suggested a multisig on-chain escrow.
        </LearnCategoryText>
        <LearnCategoryText>
          Again, the idea was simple: use the same approach for mining that has worked for years on dark web markets. I had no idea!
        </LearnCategoryText>
        <LearnCategoryText>
          After some trial and error over the following year (more like 2+ years) we landed on a 50/50 escrow, so buyers don't lose their shirt and miners have an incentive to sell their hashrate.
        </LearnCategoryText>

        <LearnCategoryTextWithImage
          text="I bought an S19 from the same company that we used for Africa, but this time they rugged me. Bad joss."
          image={Rugged}
          imageAlt="Hey, where's my hashrate?"
          imagePosition="left"
        />

        <LearnCategorySubTitle>Auctions</LearnCategorySubTitle>

        <LearnCategoryText>
          Tbh I don't remember where the auction idea came from. My wife and I watched a lot of auction-calling videos on Youtube during Covid, and hashrate is like any other commodity, so why isn't there an auction for it?
          Indeed. Also somewhere around this time, we started kicking around Rigly as a name, and I registered the domain - the critical step of any project! - and put together an auction site on Shopify.
        </LearnCategoryText>

        <LearnCategoryTextWithImage
          text="I made a simple MVP auction site on Shopify using an auction widget for the marketplace. Good enough to get 20+ users."
          image={Shopify}
          imageAlt="The first version of Rigly"
          imagePosition="right"
        />

        <LearnCategoryText>
          Oh it was awful - I mean, it was glorious, and it got the job done. I verified enough of the idea to create a pitch deck, we raised some funding from Chaincode, and I connected with Nico, who agreed to join and knew way more about mining.
          And little by little, we grew the idea and connected with developers (Tobi and Kevin!) to make a real platform.
        </LearnCategoryText>

        <LearnCategorySubTitle>Rigly, today</LearnCategorySubTitle>

        <LearnCategoryText>
          Everything I just described was in 2022. Building takes time, we raised a little more funding, and figured out more and more of the puzzle. Today (late 2024) we have a platform ready to show the world - we will see what happens.
          Thanks for reading all the way. -Evan
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
            description="Evan iterates on Rigly daily. Previously led R&D infrastructure at a global trading firm and has a passion for Bitcoin mining."
          />
          <TeamMemberCard
            image={nico}
            name="Nico Preti"
            description="Nico grows Rigly daily. Formerly managed communications for Poolin and btc.com and is a long-time writer and participant in Bitcoin."
          />
          <TeamMemberCard
            image={jonas}
            name="Adam Jonas"
            description="Jonas leads educational initiatives at Chaincode Labs. He previously worked in education and baseball talent development. His favorite nonce is 42."
          />
          <TeamMemberCard
            image={asher}
            name="Asher Pembroke"
            description="Asher, a skilled researcher, has a PhD in Space Weather Modeling from Rice University and specializes in mathematical modeling and data visualization."
          />
          <TeamMemberCard
            image={sasa}
            name="Saša Buklijaš"
            description="Saša manages our hashrate proxy, which routes hashrate from mining farms around the world."
          />
          <TeamMemberCard
            image={placeholder}
            name="Andrew Meisel"
            description="Andrew was Rigly's 10th customer when it ran on Shopify and now handles communications and outreach."
          />
        </ul>
      </article>
    </>
  )
}

export default OurStory
