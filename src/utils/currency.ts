export function formatMoney(number: number) {
  return Number(number.toFixed(2)).toLocaleString()
}

export function transformCurrencyToNumber(currency: string | number) {
  const _currency = String(currency)

  return Number(_currency.replace(/[^0-9.-]+/g, ''))
}
