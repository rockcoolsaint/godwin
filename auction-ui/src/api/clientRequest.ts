import { FetchError } from './error'

interface MakeClientRequestProps {
  host?: string
  method: 'GET' | 'POST' | 'PATCH' | 'PUT'
  path: string
  body?: object
  blob?: boolean
  abortSignal?: AbortSignal
}

export const makeClientRequest = async ({
  host = process.env.NEXT_PUBLIC_APP_API_SERVER_URL,
  method = 'GET',
  blob,
  path,
  body,
  abortSignal,
}: MakeClientRequestProps) => {
  let response: Response | undefined = undefined
  let json: any = undefined
  try {
    const basePath = host
    response = await fetch(`${basePath}${path}`, {
      method,
      ...(body && {
        body: JSON.stringify(body),
      }),
      ...(abortSignal && { signal: abortSignal }),
      headers: { 'Content-Type': 'application/json' },
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
