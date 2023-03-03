export function url(path?: string) {
  const p = path?.startsWith("/") ? path : `/${path}`;

  const baseUrl = "https://localhost:8000";

  return `${baseUrl}${p}`;
}
