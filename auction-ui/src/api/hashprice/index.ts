import { get } from 'utils'

// TO DO - use react-query for fetching and caching
export async function getDifficultyAdjustment() {
  const data = await get({
    url: `https://mempool.space/api/v1/difficulty-adjustment`,
  })

  return data
}

export async function getBlockTipHeight() {
  const data = get({
    url: `https://mempool.space/api/blocks/tip/height`,
  })

  return data
}

export interface HashRateResponse {
  hashrates: []
  difficulty: []
  currentHashrate: number
  currentDifficulty: number
}

interface EpochData {
  mean: number
  median: number
}

export interface HashpriceDict {
  [epoch: number]: EpochData
}

export async function getHashPrice() {
  const data: HashpriceDict = await get({
    url: `https://auctions.rigly.io/api/data/hashprice`,
  })

  return data
}

export async function getHashRate() {
  const data: HashRateResponse = await get({
    url: `https://mempool.space/api/v1/mining/hashrate/1m`,
  })

  return data
}
