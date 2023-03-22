import { FetchError } from './error'
import { url } from 'src/utils'

interface MakeClientRequestProps {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT'
  path: string
  body?: object
  blob?: boolean
  abortSignal?: AbortSignal
  headers?: object
}

export const makeClientRequest = async ({ method = 'GET', blob, path, body, abortSignal, headers }: MakeClientRequestProps) => {
  let response: Response | undefined = undefined
  let json: any = undefined
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  }

  try {
    response = await fetch(url(path), {
      method,
      ...(body && {
        body: JSON.stringify(body),
      }),
      ...(abortSignal && { signal: abortSignal }),
      headers: requestHeaders,
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
  }

  // this change is temporary until Backend is fixed
  throw new FetchError(response, (json?.errors || json?.error) ?? `[clientRequest] error making ${method} request to ${path}`)
}
