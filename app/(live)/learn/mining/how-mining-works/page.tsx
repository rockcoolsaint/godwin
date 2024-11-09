'use client'
import MiningLayout from 'src/components/learn/MiningLayout'
import HowMiningWorks from 'src/components/learn/mining/HowMiningWorks'

export default function MiningPage() {
  return (
    <MiningLayout navTitle="Mining Docs">
      <HowMiningWorks />
    </MiningLayout>
  )
}