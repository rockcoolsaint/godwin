// src/api/ckpool/getHashrateData.ts

import { makeClientRequest } from 'src/api/clientRequest'

export interface CKPoolHashrateData {
  timestamp: string;
  hashrate: number;
  escrow_address: string;
}

export interface TotalHashrateData {
  base_hashrate: number;
  current_hashrate: number;
  bonus_hashrate: number;
}

export async function getCKPoolHashrateData(): Promise<CKPoolHashrateData[]> {
  try {
    const result = await makeClientRequest({
      method: 'GET',
      path: '/api/auctions/get-ckpool-hashrate'
    })
    return result.data
  } catch (error) {
    throw new Error('Failed to fetch CKPool hashrate data')
  }
}

export async function getTotalHashrateData(): Promise<TotalHashrateData> {
  try {
    const result = await makeClientRequest({
      method: 'GET',
      path: '/api/auctions/get-hashrate-comparison-view'
    })

    // Validate the response data
    if (!result || typeof result !== 'object') {
      throw new Error('Invalid response format')
    }

    const { base_hashrate, current_hashrate, bonus_hashrate } = result

    // Validate that all required fields are numbers
    if (
      typeof base_hashrate !== 'number' ||
      typeof current_hashrate !== 'number' ||
      typeof bonus_hashrate !== 'number'
    ) {
      throw new Error('Invalid hashrate data format')
    }

    return {
      base_hashrate,
      current_hashrate,
      bonus_hashrate
    }
  } catch (error) {
    console.error('Failed to fetch total hashrate comparison data:', error)
    throw error
  }
}