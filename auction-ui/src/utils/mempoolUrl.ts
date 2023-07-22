export type Network = 'bitcoin'

export default function mempoolTxUrl(txid?: string, network?: Network) {
  if (!txid) {
    console.error('Problem creating the mempool url')

    return '#'
  }

  if (network) {
    switch (network) {
      case 'bitcoin':
        return `https://mempool.space/tx/${txid}`
      default:
        return `https://mempool.space/tx/${txid}`
    }
  }

  return `https://mempool.space/tx/${txid}`
}
