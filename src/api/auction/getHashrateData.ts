'use client'
import { url as URL, createUrl } from 'utils'

import { FetchError } from 'src/api/error'

export interface HashrateData {
  timestamp: string
  hashrate: number
}

export async function getHashrateData(stratums_id: number): Promise<HashrateData[]> {
  const url = createUrl(URL(`api/data/hashrate/${stratums_id}`), new URLSearchParams({ resolution: '6', type: 'hours' }))

  const response = await fetch(url)
  const json = await response.json()

  if (json.error) {
    throw new FetchError(response, (json?.errors || json?.error) ?? `[clientRequest] error making GET request to ${url}`)
  }

  return json
}
