'use client'
import MiningLayout from 'src/components/learn/MiningLayout'
import HistoryOfMining from 'src/components/learn/mining/HistoryOfMining'

export default function MiningPage() {
  return (
    <MiningLayout navTitle="Mining Docs">
      <HistoryOfMining />
    </MiningLayout>
  )
}