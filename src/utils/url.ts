export function getPageUrl(Astro: any): string {
  return new URL(Astro.url.pathname, Astro.site).toString();
}
