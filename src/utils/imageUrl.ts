import { url } from './url'

const baseUrl = process.env.NEXT_PUBLIC_APP_API_SERVER_URL || ''

export default function imageUrl(path: string | undefined, size: string) {
  if (!path) {
    return `https://via.placeholder.com/${size}`
  }

  const origin = path.replace(/.*?:\/\//g, '')
  const baseOrigin = baseUrl.replace(/.*?:\/\//g, '')

  if (origin.indexOf(baseOrigin) !== -1) {
    return `https://${origin}`
  }

  return url(origin)
}
