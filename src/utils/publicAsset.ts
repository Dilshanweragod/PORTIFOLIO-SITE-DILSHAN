export function publicAssetUrl(path: string, baseUrl: string = import.meta.env.BASE_URL): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path;

  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${base}${path.replace(/^\/+/, '')}`;
}
