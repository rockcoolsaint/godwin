'use client'
import Head from 'next/head'
import LearnPage from 'src/components/learn/LearnPage'
import HashrateExplained from 'src/components/learn/mining/HashrateExplained'
import MiningPoolProfiles from 'src/components/learn/mining/MiningPoolProfiles'
import HistoryOfMining from 'src/components/learn/mining/HistoryOfMining'
import MiningDifficulty from 'src/components/learn/mining/MiningDifficulty'
import HowMiningWorks from 'src/components/learn/mining/HowMiningWorks'

const categories = [
  { title: 'Hashrate Explained', Component: HashrateExplained },
  {
    title: 'Mining Pool Profiles',
    Component: MiningPoolProfiles,
  },
  {
    title: 'History of Mining',
    Component: HistoryOfMining,
  },
  {
    title: 'Mining Difficulty',
    Component: MiningDifficulty,
  },
  {
    title: 'How Mining Works',
    Component: HowMiningWorks,
  },
]

const MiningPage = () => {
  return (
    <>
      <Head>
        <title>Mining - Learning Resources</title>
      </Head>
      <LearnPage categories={categories} navTitle="Mining Docs" />
    </>
  )
}

export default MiningPage
