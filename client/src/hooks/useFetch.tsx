import { useState } from 'react';
import fetchFunc from '../services/config';

interface FetchProps {
  initialLoading: boolean;
}

const useFetch = <R, T = undefined>({ initialLoading }: FetchProps) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [response, setResponse] = useState<R | null>(null);

  const fetchReq = async (
    query: string,
    variables?: T,
    signal?: AbortSignal | null,
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    try {
      setIsLoading(true);
      const res = await fetchFunc<R, T>(query, variables, signal);
      setResponse(res);
      if (onSuccess) onSuccess();
    } catch (err) {
      if (onError) onError();
      console.error('Error in fetchReq:', err);
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  };

  return { isLoading, response, fetchReq };
};

export default useFetch;
