'use client'
import MiningLayout from 'src/components/learn/MiningLayout'
import MiningDifficulty from 'src/components/learn/mining/MiningDifficulty'

export default function MiningPage() {
  return (
    <MiningLayout navTitle="Mining Docs">
      <MiningDifficulty />
    </MiningLayout>
  )
}