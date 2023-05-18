import { get } from 'utils'

export async function getDifficultyAdjustment() {
  const data = await get(`https://mempool.space/api/v1/difficulty-adjustment`)

  return data
}

export async function getBlockTipHeight() {
  const data = get(`https://mempool.space/api/blocks/tip/height`)

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

export async function getEpoch() {
  const data: HashpriceDict = await get(`https://auctions.rigly.io/api/data/hashprice`)

  return data
}

export async function getHashRate() {
  const data: HashRateResponse = await get(`https://mempool.space/api/v1/mining/hashrate/1m`)

  return data
}
