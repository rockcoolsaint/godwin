const defaultHeaders = {
  "Content-Type": "application/json",
};

function getAuthorizationHeader() {
  const token = "";
  return `Bearer ${token}`;
}

function getHeaders(headers: Object | undefined): Headers {
  const result = new Headers();

  Object.entries(defaultHeaders).forEach(([key, val]) => {
    result.set(key, val);
  });

  if (headers) {
    Object.entries(headers).forEach(([key, val]) => {
      result.set(key, val);
    });
  }

  // result.set("Authorization", getAuthorizationHeader());

  return result;
}

export async function get(url: string, headers?: Object) {
  const res = await fetch(url, {
    method: "GET",
    headers: getHeaders(headers),
  });

  const data = await res.json();

  return data;
}

export async function put(url: string, payload: Object, headers?: Object) {
  const res = await fetch(url, {
    method: "PUT",
    headers: getHeaders(headers),
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
}

export async function post(url: string, payload: Object, headers?: Object) {
  const res = await fetch(url, {
    method: "POST",
    headers: getHeaders(headers),
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
}
