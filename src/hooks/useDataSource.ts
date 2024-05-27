import { useEffect, useState } from "react";

export interface UseDataSourceProps<T> {
  getResourceFn: () => Promise<T>;
}

const useDataSource = <T>(props: UseDataSourceProps<T>) => {
  const { getResourceFn } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);

  const fetchData = async () => {
    try {
      const response = await getResourceFn();
      setData(response);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getResourceFn]);

  const retry = () => {
    setIsLoading(true);
    setError(undefined);
    setData(undefined);
    fetchData();
  };

  return { isLoading, error, data, retry };
};

export type UseDataSourceReturn = ReturnType<typeof useDataSource>;

export default useDataSource;
