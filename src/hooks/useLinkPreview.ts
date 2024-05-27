import { metadataExtractor } from "../utils";
import useDataSource from "./useDataSource";

export interface IMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  hostname: string;
}

export interface UseLinkPreviewProps {
  url: string | URL;
}

const useLinkPreview = (props: UseLinkPreviewProps) => {
  const { url } = props;

  const { isLoading, data, error, retry } = useDataSource({
    getResourceFn: () => fetch(url).then((res) => res.text()),
  });

  const metadata: IMetadata = {
    hostname: new URL(url).hostname,
    ...(!isLoading && !error ? metadataExtractor({ data }) : {}),
  };

  return { isLoading, error, metadata, retry };
};

export type UseLinkPreviewReturn = ReturnType<typeof useLinkPreview>;

export default useLinkPreview;
