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
          className="w-full max-w-xl aspect-video" 
          src="https://www.youtube.com/embed/JWYfUCkj-G0" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen 
        />
        </div>

        <LearnCategorySubTitle>Who We Are</LearnCategorySubTitle>

        <LearnCategoryText>
        Rigly was founded in 2022 by Evan and Jonas with a mission to make bitcoin mining accessible to everyone—without the risk of getting rug-pulled.
        </LearnCategoryText>

          <LearnCategoryText>
          Evan and Jonas tried setting up a solar-powered mining farm in Africa, but quickly learned that running a mining operation wasn't so easy. This lead Evan to try hosted mining in Texas, but things there went worse: his machines were damaged and he lost everything.
          </LearnCategoryText>

          <LearnCategoryText>
          From these setbacks Rigly was born—a marketplace that lowers the barrier to entry so everyone can mine bitcoin: easy, safe, and scam-free.
          </LearnCategoryText>

          <LearnCategoryText>
          On Rigly, miners get paid upfront so they can grow their operations. Buyers gain access to mining, earn new bitcoin, and potentially profit while securing the network.
          </LearnCategoryText>

          <LearnCategoryText>
            Click next to start mining!
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
