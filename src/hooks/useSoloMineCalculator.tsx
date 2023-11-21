import { useEffect, useState } from 'react'
import { getHashRate } from 'src/api/hashprice'

const useSoloMineCalculator = ({ customHashrate }: { customHashrate?: number }) => {
  const [loading, setLoading] = useState(false)
  const [globalHashrate, setGlobalHashrate] = useState(0)
  const [chancePerBlock, setChancePerBlock] = useState(0)
  const [chancePerBlockDay, setChancePerBlockDay] = useState(0)
  const [difficulty, setDifficulty] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const hashrate = await getHashRate()
        setGlobalHashrate(Math.floor(hashrate.currentHashrate / 1_000_000_000_000))
        setDifficulty(hashrate.currentDifficulty / 1_000_000_000_000)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (customHashrate) {
      const chancePerBlock = Math.floor(globalHashrate / customHashrate)
      setChancePerBlock(chancePerBlock)

      const _chancePerBlockDay = Math.floor(chancePerBlock / (6 * 24))
      setChancePerBlockDay(_chancePerBlockDay)
    }
  }, [customHashrate, globalHashrate])

  return { globalHashrate, chancePerBlock, chancePerBlockDay, isLoading: loading, difficulty }
}

export default useSoloMineCalculator
