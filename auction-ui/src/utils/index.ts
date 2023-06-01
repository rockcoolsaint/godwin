export * from './fetch'
export * from './url'
export { default as imageUrl } from './imageUrl'
export { default as isOrderFulfilled } from './isOrderFulfilled'

export function underscoreToSpaceAndCapitalize(str: string) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
