export interface IMiningPool {
  id: number
  name: string
  address: string
}

export const MINING_POOLS: Array<IMiningPool> = [
  { id: 1, name: 'Luxor', address: 'btc.global.luxor.tech:700' },
  { id: 2, name: 'Braiins', address: 'stratum.braiins.com:3333' },
  { id: 3, name: 'Lincoin', address: 'NA.lincoin.com:3333' },
  { id: 4, name: 'F2pool', address: 'btc.f2pool.com:1314' },
  { id: 5, name: 'Antpool', address: 'ss.antpool.com:3333' },
  { id: 6, name: 'Binance', address: 'sha256.poolbinance.com:8888' },
  { id: 7, name: 'ViaBTC', address: 'btc.viabtc.com:3333' },
  { id: 8, name: 'BTC.com', address: 'us.ss.btc.com:1800' },
  { id: 9, name: 'KuCoin', address: 'sha256d.kupool.com:443' },
  { id: 10, name: 'Other', address: '' },
]
