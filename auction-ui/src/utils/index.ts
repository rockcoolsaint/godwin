export * from './fetch'
export * from './url'

export function underscoreToSpaceAndCapitalize(str: string) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
