/* eslint-disable no-console */
import { url } from 'utils'
import { FetchError } from './error'

interface ServerRequestProps {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT'
  path: string
  body?: object
  blob?: boolean
  cache?: RequestCache
  nextFetchRequestConfig?: NextFetchRequestConfig
  throwOnError?: boolean
}

export const makeServerRequest = async ({
  method = 'GET',
  blob,
  path,
  body,
  cache,
  nextFetchRequestConfig,
  throwOnError,
}: ServerRequestProps) => {
  let response: Response | undefined = undefined
  let json: any = undefined
  try {
    response = await fetch(url(path), {
      method,
      ...(body && {
        body: JSON.stringify(body),
      }),
      ...(cache && {
        cache,
      }),
      headers: { 'Content-Type': 'application/json' },
      ...(nextFetchRequestConfig && {
        next: nextFetchRequestConfig,
      }),
    })

    if (blob) {
      return await response.blob()
    }

    json = await response.json()
    if (response.ok) {
      return json
    }
  } catch (error) {
    // fall through
    console.error('error server request -- ', error)
  }
  if (throwOnError === false) {
    return
  }
  if (throwOnError || (response?.status && response?.status >= 400 && response?.status !== 404)) {
    throw new FetchError(response, (json?.error || json?.errors) ?? `[serverRequest] error making ${method} request to ${path}`)
  }
}
