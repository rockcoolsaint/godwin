'use client'
import MiningLayout from 'src/components/learn/MiningLayout'
import MiningPoolProfiles from 'src/components/learn/mining/MiningPoolProfiles'

export default function MiningPage() {
  return (
    <MiningLayout navTitle="Mining Docs">
      <MiningPoolProfiles />
    </MiningLayout>
  )
}