/** Root-relative path for files in `public/` (works from any client route). */
export function resolvePublicAsset(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

export function openPublicAssetInNewTab(url: string | undefined): void {
  const href = resolvePublicAsset(url);
  if (!href) return;
  window.open(href, "_blank", "noopener,noreferrer");
}

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
export const checkURL = (str: string): boolean => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i" // fragment locator
  );
  return !!pattern.test(str);
};
