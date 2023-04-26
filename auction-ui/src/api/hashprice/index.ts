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
  avg_fees_per_block: number
  current_hashrate: number
  current_hashrate_estimated: number
  fees_percent: number
  hash_price: number
  hash_rate_30: number
  hash_value: number
  monthly_avg_hashrate_change_1_year: MonthlyAvgHashrateChange1Year
  rev_usd: number
}

export interface MonthlyAvgHashrateChange1Year {
  absolute: number
  relative: number
}

export async function getHashRate() {
  const data: HashRateResponse = await get(`https://insights.braiins.com/api/v1.0/hash-rate-stats`)

  return data
}
