export const metadataExtractor = ({ data = "" }) => {
  const html = new DOMParser().parseFromString(data, "text/html");

  const title = html.querySelector("title")?.innerText || undefined;

  const description =
    html.querySelector("meta[name='description']")?.getAttribute("content") ||
    undefined;

  const image =
    html.querySelector("meta[name='og:image']")?.getAttribute("content") ||
    undefined;

  const siteName =
    html.querySelector("meta[name='og:site_name']")?.getAttribute("content") ||
    undefined;

  return { title, description, image, siteName };
};
