export interface IMiningPool {
  id: number
  name: string
  address: string
}

export const MINING_POOLS: Array<IMiningPool> = [
  { id: 1, name: 'Ocean', address: 'stratum+tcp://mine.ocean.xyz:3334' },
  { id: 2, name: 'EMCD Pool', address: 'us.emcd.io:3333' },
  { id: 3, name: 'Luxor', address: 'btc.global.luxor.tech:700' },
  { id: 4, name: 'Braiins', address: 'stratum.braiins.com:3333' },
  { id: 5, name: 'CK Pool', address: 'solo.ckpool.org:3333' },
  { id: 6, name: 'SBI Crypto', address: 'us1.sbicrypto.com:3333' },
  { id: 7, name: 'Spider Pool', address: 'btc-us.spiderpool.com:2309' },
  { id: 8, name: 'Lincoin', address: 'NA.lincoin.com:3333' },
  { id: 9, name: 'F2pool', address: 'btc.f2pool.com:1314' },
  { id: 10, name: 'Antpool', address: 'ss.antpool.com:3333' },
  { id: 11, name: 'Binance', address: 'sha256.poolbinance.com:8888' },
  { id: 12, name: 'ViaBTC', address: 'btc.viabtc.com:3333' },
  { id: 13, name: 'BTC.com', address: 'us.ss.btc.com:1800' },
  { id: 14, name: 'KuCoin', address: 'sha256d.kupool.com:443' },
  { id: 15, name: 'Other', address: 'stratum.example.com:3333' },
]
