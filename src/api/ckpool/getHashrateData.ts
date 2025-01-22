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
    return result.data
  } catch (error) {
    throw new Error('Failed to fetch total hashrate comparison data')
  }
}