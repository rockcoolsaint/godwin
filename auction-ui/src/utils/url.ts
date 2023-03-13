export function url(path?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_API_SERVER_URL || 'https://qa.auctions.rigly.io'

  if (!path) {
    return baseUrl
  }

  const p = path.startsWith('/') ? path : `/${path}`

  return `${baseUrl}${p}`
}
