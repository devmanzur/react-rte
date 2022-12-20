import { useState, useMemo } from 'react';
import { ApiStatus, defaultApiStatuses } from '../types/ApiStatus';

interface Statuses {
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const prepareStatuses = (currentStatus: ApiStatus): Statuses => {
  const statuses = {} as Statuses;
  for (const status of defaultApiStatuses) {
    const normalisedStatusKey = `is${status}` as keyof Statuses;
    statuses[normalisedStatusKey] = status === currentStatus.toString();
  }
  return statuses;
};

export const useApiStatus = (currentStatus: ApiStatus = ApiStatus.Idle) => {
  const [status, setStatus] = useState<ApiStatus>(currentStatus);
  const statuses = useMemo(() => prepareStatuses(status), [status]);
  return {
    status,
    setStatus,
    ...statuses,
  };
};
