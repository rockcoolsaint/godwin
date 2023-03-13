export function url(path?: string) {
  // TODO: Replace with env var once Next.js migration has been completed.
  const baseUrl = process.env.REACT_APP_HTTPS_PROXY || "https://qa.rigly.io";

  if (!path) {
    return baseUrl;
  }

  const p = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${p}`;
}
