const defaultHeaders = {
  'Content-Type': 'application/json',
}

function getHeaders(headers: Headers | undefined): Headers {
  const result = new Headers()

  Object.entries(defaultHeaders).forEach(([key, val]) => {
    result.set(key, val)
  })

  if (headers) {
    Object.entries(headers).forEach(([key, val]) => {
      result.set(key, val)
    })
  }

  // TODO: Implement generic way to add Authorization headers.

  return result
}

export async function get(url: string, headers?: Headers) {
  const res = await fetch(url, {
    method: 'GET',
    ...(Boolean(headers) && { headers: getHeaders(headers) }),
  })

  return await res.json()
}

export async function put(url: string, payload: any, headers?: Headers) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: getHeaders(headers),
    body: JSON.stringify(payload),
  })

  return await res.json()
}

export async function putFormData(url: string, payload: any, headers?: Headers) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      ...headers,
    } as Headers,
    body: payload,
  })

  return await res.json()
}

export async function post(url: string, payload: any, headers?: Headers) {
  const res = await fetch(url, {
    method: 'POST',
    headers: getHeaders(headers),
    body: JSON.stringify(payload),
  })

  return await res.json()
}
