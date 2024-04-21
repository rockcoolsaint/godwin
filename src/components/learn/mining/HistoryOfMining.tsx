import LearnCategoryTitle from 'src/components/learn/LearnCategoryTitle'
import LearnCategorySubTitle from 'src/components/learn/LearnCategorySubTitle'
import LearnCategoryText from 'src/components/learn/LearnCategoryText'
import LearnCategoryTextWithImage from 'src/components/learn/LearnCategoryTextWithImage'
import MiningIllustration from 'src/images/pro-img1.png'

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
        image={MiningIllustration}
        imageAlt="Early days of mining illustration"
        imagePosition="right"
      />

      <LearnCategorySubTitle>GPU Era (2011-2012)</LearnCategorySubTitle>
      <LearnCategoryTextWithImage
        text="Miners began using graphics processing units (GPUs), which were significantly faster at generating hashes. This led to a substantial increase in mining efficiency and the network hashrate."
        image={MiningIllustration}
        imageAlt="GPU mining illustration"
        imagePosition="left"
      />

      <LearnCategorySubTitle>FPGA Era (2012-2013)</LearnCategorySubTitle>
      <LearnCategoryTextWithImage
        text="The introduction of Field-Programmable Gate Arrays (FPGAs) offered an improvement over GPUs in terms of power efficiency. FPGAs are integrated circuits that miners could reconfigure to suit their needs."
        image={MiningIllustration}
        imageAlt="FPGA mining illustration"
        imagePosition="right"
      />

      <LearnCategorySubTitle>ASIC Era (2013-Present)</LearnCategorySubTitle>
      <LearnCategoryTextWithImage
        text="The arrival of Application-Specific Integrated Circuits (ASICs) revolutionized Bitcoin mining. ASICs are custom-built for a specific use, in this case, mining Bitcoin. This era saw an exponential increase in the hashrate and difficulty level of mining operations."
        image={MiningIllustration}
        imageAlt="ASIC mining illustration"
        imagePosition="left"
      />

      <LearnCategorySubTitle>Industrial Mining (2015-Present)</LearnCategorySubTitle>
      <LearnCategoryTextWithImage
        text="Mining in recent years has become largely industrialized. Large-scale facilities with dedicated data centers and significant electrical infrastructure dominate Bitcoin mining."
        image={MiningIllustration}
        imageAlt="Industrial mining illustration"
        imagePosition="right"
      />
    </>
  )
}

export default HistoryOfMining
