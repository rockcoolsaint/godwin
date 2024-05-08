import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'
import MiningIllustration from 'src/images/pro-img1.png'
import cpu from 'src/images/cpuminer.jpg'
import gpu from 'src/images/gpumining.jpg'
import butterfly from 'src/images/butterfly.jpg'
import s9 from 'src/images/s9.jpg'
import riot from 'src/images/riot.jpg'

const HistoryOfMining = () => {
  return (
    <>
      <LearnCategoryTitle>History of Mining</LearnCategoryTitle>

      <LearnCategoryText>
        The evolution of Bitcoin mining can be segmented into five distinct eras, each marked by significant technological advancements and
        changes in mining practices:
      </LearnCategoryText>

      <LearnCategorySubTitle>The Early Days (2009-2010)</LearnCategorySubTitle>
      <LearnCategoryTextWithImage
        text="Mining started on standard multi-core CPUs (Central Processing Units) in computers. Anyone with a computer could mine Bitcoin, and the hashrate was relatively low."
        image={cpu}
        imageAlt="Early days of mining on your pc"
        imagePosition="right"
        imageSize={300}
      />

      <LearnCategorySubTitle>GPU Era (2011-2012)</LearnCategorySubTitle>
      <LearnCategoryTextWithImage
        text="Miners began using graphics processing units (GPUs), which were significantly faster at generating hashes. This led to a substantial increase in mining efficiency and the network hashrate."
        image={gpu}
        imageAlt="GPU mining photo"
        imagePosition="left"
        imageSize={300}
      />

      <LearnCategorySubTitle>Early ASIC Era (2012)</LearnCategorySubTitle>
      <LearnCategoryTextWithImage
        text="The early Application-Specific Integrated Circuit (ASIC) era had many false starts and rug pulls, as companies raced to get a working ASIC to market. Butterfly Labs produced one of the first ASIC miners, for those lucky enough to receive their order."
        image={butterfly}
        imageAlt="Photo of butterfly labs ASIC mining rig"
        imagePosition="right"
        imageSize={300}
      />

      <LearnCategorySubTitle>ASIC Dominant Era (2014-Present)</LearnCategorySubTitle>
      <LearnCategoryTextWithImage
        text="The efficiency race for faster mining hardware revolutionized Bitcoin mining. This era saw an exponential increase in the physical number of mining rigs, along with hashrate and difficulty level. The Antminer S9 shown here was produced by the millions."
        image={s9}
        imageAlt="Photo of Antminer S9"
        imagePosition="left"
        imageSize={300}
      />

      <LearnCategorySubTitle>Industrial Mining (2017-Present)</LearnCategorySubTitle>
      <LearnCategoryTextWithImage
        text="Mining in recent years has become largely industrialized. Large-scale facilities with dedicated data centers and significant electrical infrastructure dominate Bitcoin mining, such as the Riot data center shown here."
        image={riot}
        imageAlt="Photo of data center in Texas operated by Riot"
        imagePosition="right"
        imageSize={300}
      />
    </>
  )
}

export default HistoryOfMining
