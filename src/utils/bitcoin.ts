const FALLBACK_BTC_PRICE = 98000

export async function getBitcoinPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
    if (!response.ok) throw new Error('Failed to fetch price')
    const data = await response.json()
    return data.bpi.USD.rate_float
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error)
    return FALLBACK_BTC_PRICE
  }
}

export function satoshisToBTC(satoshis: number): number {
  return satoshis / 100000000
}

export function satoshisToFiat(satoshis: number): Promise<number> {
  return getBitcoinPrice().then(btcPrice => {
    const btcAmount = satoshisToBTC(satoshis)
    return btcAmount * btcPrice
  })
}
