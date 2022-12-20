import { ApiStatus } from './../types/ApiStatus';
import { useState } from 'react';
import { useApiStatus } from './useApiStatus';

interface UseApiConfig<T> {
  initialData?: T;
}

type ApiFunction<T = unknown> = (...args: unknown[]) => T | Promise<T>;

export function useApi<TData = unknown, TError = unknown>(
  fn: ApiFunction<TData>,
  config: UseApiConfig<TData> = {},
) {
  const { initialData } = config;
  const [data, setData] = useState<TData | undefined>(initialData);
  const [error, setError] = useState<TError | unknown>();
  const { status, setStatus, ...normalisedStatuses } = useApiStatus();
  const exec = async <A>(...args: A[]) => {
    try {
      setStatus(ApiStatus.Pending);
      const data = await fn(...args);
      setData(data);
      setStatus(ApiStatus.Success);
      return {
        data,
        error: null,
      };
    } catch (error) {
      setError(error);
      setStatus(ApiStatus.Error);
      return {
        error,
        data: null,
      };
    }
  };
  return {
    data,
    // setData,
    status,
    // setStatus,
    error,
    exec,
    ...normalisedStatuses,
  };
}
