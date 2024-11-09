'use client'
import MiningLayout from 'src/components/learn/MiningLayout'
import HashrateExplained from 'src/components/learn/mining/HashrateExplained'

export default function MiningPage() {
  return (
    <MiningLayout navTitle="Mining Docs">
      <HashrateExplained />
    </MiningLayout>
  )
}