const btcNonBech = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/
const btcBech = /^(bc1|BC1|[13])[a-zA-HJ-NP-Z0-9]{25,87}$/

/* testnet */
const btcNonBechTestnet = /^[2][a-km-zA-HJ-NP-Z1-9]{25,34}$/
const btcBechTestnet = /^(bc1|bcrt1|BC1|BCRT1|[2])[a-zA-HJ-NP-Z0-9]{25,89}$/
const btcBechPubkeyScriptHashTestnet = /^(tb1|TB1|[2])[a-zA-HJ-NP-Z0-9]{25,89}$/

class AddressUtils {
  isValidBitcoinAddress = (input: string, testnet: boolean) => {
    if (testnet) {
      return btcNonBechTestnet.test(input) || btcBechTestnet.test(input) || btcBechPubkeyScriptHashTestnet.test(input)
    }

    return btcNonBech.test(input) || btcBech.test(input)
  }
}

const addressUtils = new AddressUtils()
export default addressUtils
