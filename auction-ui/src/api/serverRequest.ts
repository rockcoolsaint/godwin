import { FetchError } from './error'

interface ServerRequestProps {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT'
  path: string
  body?: object
  blob?: boolean
  cache?: RequestCache
  throwOnError?: boolean
}

export const makeServerRequest = async ({ method = 'GET', blob, path, body, cache, throwOnError }: ServerRequestProps) => {
  let response: Response | undefined = undefined
  let json: any = undefined
  try {
    const basePath = process.env.NEXT_PUBLIC_APP_API_SERVER_URL
    response = await fetch(`${basePath}${path}`, {
      method,
      ...(body && {
        body: JSON.stringify(body),
      }),
      ...(cache && {
        cache,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (blob) {
      return await response.blob()
    }

    json = await response.json()
    console.log('inside server request -- response ', json)
    if (response.ok) {
      return json
    }
  } catch (error) {
    // fall through
  }
  if (throwOnError === false) {
    return
  }
  if (throwOnError || (response?.status && response?.status >= 400 && response?.status !== 404)) {
    throw new FetchError(response, (json?.error || json?.errors) ?? `[serverRequest] error making ${method} request to ${path}`)
  }
}
