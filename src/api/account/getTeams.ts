// src/api/account/getTeams.ts

import { makeClientRequest } from 'src/api/clientRequest'

export interface Team {
  id: string
  name: string
  logo?: string
  slug: string
  payout_address?: string
  hash_price_premium: number
}

export async function getTeams(): Promise<Team[]> {
  console.log('Fetching teams...')
  
  try {
    const res = await makeClientRequest({
      method: 'GET',
      path: '/api/sellers/teams',
    })
    
    console.log('Teams API response:', res)

    // Validate response
    if (!res) {
      console.error('Teams API returned null/undefined response')
      throw new Error('No data received from teams API')
    }

    // Check if response is an array
    if (!Array.isArray(res)) {
      console.error('Teams API returned non-array response:', res)
      throw new Error('Invalid response format from teams API')
    }

    // Validate team objects
    const validTeams = res.filter(team => {
      const isValid = team && typeof team === 'object' && 'id' in team && 'name' in team
      if (!isValid) {
        console.warn('Invalid team object found:', team)
      }
      return isValid
    })

    console.log('Processed teams:', validTeams)
    return validTeams
  } catch (error) {
    console.error('Error in getTeams:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response
    })
    throw error
  }
}