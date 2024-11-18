import placeholder from 'src/assets/jpg/placeholder.jpg'
import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'
import LearnCategoryImageWithCaption from 'src/components/learn/LearnCategoryImageWithCaption'
import Link from 'src/components/shared/Link'

const StartMiningNow = () => {
  return (
    <>
      <article>

        <LearnCategoryTitle>Start Mining Now</LearnCategoryTitle>

        <div className="mt-10 flex justify-center">
        <iframe 
          className="w-full max-w-3xl aspect-video" 
          src="https://www.youtube.com/embed/JWYfUCkj-G0" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen 
        />
        </div>

        <LearnCategorySubTitle>Who We Are</LearnCategorySubTitle>

        <LearnCategoryText>
        Hi, I’m Nico, and I’m excited to introduce you to Rigly.<br/> Here’s a quick rundown of who we are, where we come from, and what we’re all about:
        </LearnCategoryText>

          <LearnCategoryText>
            Rigly was founded in 2022 by Evan and Jonas, with a mission to make Bitcoin mining accessible to everyone—without the risk of getting rug-pulled.
          </LearnCategoryText>

          <LearnCategoryText>
            Evan and Jonas started out trying to set up a solar-powered mining farm in Africa. They quickly learned that running a mining operation wasn’t easy. 
          To keep going, Evan sent his machines to a hosted mining facility, but things didn’t go as planned. His machines were damaged, and he lost everything.
          </LearnCategoryText>
          <LearnCategoryText>
            From these setbacks, Rigly was born—a marketplace that makes Bitcoin mining easier, safer, and scam-free.
          </LearnCategoryText>

        <LearnCategorySubTitle>What We Do</LearnCategorySubTitle>

        <LearnCategoryText>
            Rigly is a marketplace where:
            </LearnCategoryText>
          <LearnCategoryText>
          <strong>Miners</strong> sell their hashrate (computing power) to Bitcoin holders.
          <br/>
          <strong>Buyers</strong> purchase hashrate to mine, earn a profit, and support the Bitcoin network.
          </LearnCategoryText>

          <LearnCategorySubTitle>Both Sides Benefit</LearnCategorySubTitle>
          <LearnCategoryText>
              <strong>Miners</strong> get upfront funding to grow their operations.
              <br/>
              <strong>Buyers</strong> gain access to mining, earn Bitcoin, and potentially profit while securing the network.
          </LearnCategoryText>

          <LearnCategorySubTitle>How Rigly Works</LearnCategorySubTitle>
          <LearnCategoryText>
            Our platform connects miners and buyers through a secure and transparent process:
            </LearnCategoryText>

            <LearnCategoryText>
              <strong>Miners</strong> route their hashrate through Rigly’s proxy servers.<br/>These servers act like post offices, directing the hashrate to specific mining pool accounts.
              <br/>
              <strong>Buyers</strong> provide funds to miners upfront.
              <br/>
              Once funds are received, miners switch their hashrate to the buyer’s designated pool account.
            </LearnCategoryText>
            <LearnCategoryText>
              With Rigly, miners receive the funding they need to expand, and buyers get reliable access to Bitcoin mining—without the hassle or risks of traditional methods.
            </LearnCategoryText>


            <LearnCategoryText>
              <br/>Join us and be part of a marketplace that’s revolutionizing Bitcoin mining!
            </LearnCategoryText>

            <div className="mb-20 mt-6 flex w-full flex-col items-center justify-center font-chakra font-bold sm:flex-row sm:px-10 lg:mt-12 lg:px-0">
                <Link
                  href="/test-drive"
                  className="lg:h-15 flex w-11/12 items-center justify-center rounded-full bg-gradient px-5 py-4 text-lg text-white outline-none hover:bg-gradient-hover disabled:cursor-not-allowed disabled:bg-gradient-disabled sm:ml-16 lg:w-8/12 lg:text-2xl xl:w-4/12"
                >
                  Sign up and try mining
                </Link>
                </div>

      </article>
    </>
  )
}


export default StartMiningNow
