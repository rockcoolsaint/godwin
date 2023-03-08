export function url(path?: string) {
  const p = path?.startsWith("/") ? path : `/${path}`;

  // TODO: Replace with env var once Next.js migration has been completed.
  const baseUrl = window.fetchUrl;

  return `${baseUrl}${p}`;
}
