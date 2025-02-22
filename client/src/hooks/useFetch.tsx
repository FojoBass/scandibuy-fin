import { useState } from 'react';
import fetchFunc from '../services/config';

interface FetchProps {
  initialLoading: boolean;
}

const useFetch = <R, T = undefined>({ initialLoading }: FetchProps) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [response, setResponse] = useState<R | null>(null);

  const fetchData = async (
    query: string,
    variables?: T,
    signal?: AbortSignal | null
  ) => {
    try {
      setIsLoading(true);
      const res = await fetchFunc<R, T>(query, variables, signal);
      setResponse(res);
    } catch (err) {
      console.error('Error in fetchData:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, response, fetchData };
};

export default useFetch;
