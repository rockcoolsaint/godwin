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
  bid_bonus_hashrate: number;
  auctioneer_match_bonus: number;
  extra_hashrate: number;
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

// Update src/api/ckpool/getHashrateData.ts
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

    const {
      base_hashrate,
      current_hashrate,
      extra_hashrate,
      bid_bonus_hashrate,
      auctioneer_match_bonus
    } = result

    // Validate that all required fields are numbers
    if (
      typeof base_hashrate !== 'number' ||
      typeof current_hashrate !== 'number' ||
      typeof extra_hashrate !== 'number' ||
      typeof bid_bonus_hashrate !== 'number' ||
      typeof auctioneer_match_bonus !== 'number'
    ) {
      throw new Error('Invalid hashrate data format')
    }

    return {
      base_hashrate,
      current_hashrate,
      extra_hashrate,
      bid_bonus_hashrate,
      auctioneer_match_bonus
    }
  } catch (error) {
    console.error('Failed to fetch total hashrate comparison data:', error)
    throw error
  }
}