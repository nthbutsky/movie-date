export const checkPosterUrl = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/");
}