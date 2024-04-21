'use client'
import Head from 'next/head'
import LearnPage from 'src/components/learn/LearnPage' // Update the import path accordingly
import OurStory from 'src/components/learn/rigly/OurStory'
import WhatIsRigly from 'src/components/learn/rigly/WhatIsRigly'
import HowEscrowWorks from 'src/components/learn/rigly/HowEscrowWorks'
import WhyAuctions from 'src/components/learn/rigly/WhyAuctions'
import SellingOnRigly from 'src/components/learn/rigly/SellingOnRigly'

const categories = [
  { title: 'Our Story & Team', Component: OurStory },
  {
    title: 'What is Rigly',
    Component: WhatIsRigly,
  },
  {
    title: 'How Escrow Works',
    Component: HowEscrowWorks,
  },
  {
    title: 'Why Auctions',
    Component: WhyAuctions,
  },
  {
    title: 'Selling on Rigly',
    Component: SellingOnRigly,
  },
]

const RiglyPage = () => {
  return (
    <>
      <Head>
        <title>Rigly - Learning Resources</title>
      </Head>
      <LearnPage categories={categories} navTitle="Rigly Docs" />
    </>
  )
}

export default RiglyPage
