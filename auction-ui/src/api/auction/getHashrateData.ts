'use client'

import { FetchError } from 'src/api/error'

export interface HashrateData {
  timestamp: string
  hashrate: number
}

export async function getHashrateData(stratums_id: number): Promise<HashrateData[]> {
  const url = `https://data.rigly.io/stratum/${stratums_id}?resolution=7`
  const response = await fetch(url)
  const json = await response.json()

  if (json.error) {
    throw new FetchError(response, (json?.errors || json?.error) ?? `[clientRequest] error making GET request to ${url}`)
  }

  return json
}
