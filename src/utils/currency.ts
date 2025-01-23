export function formatMoney(number: number) {
  return Math.ceil(number).toLocaleString()
}

export function transformCurrencyToNumber(currency: string | number) {
  const _currency = String(currency)

  return Number(_currency.replace(/[^0-9.-]+/g, ''))
}