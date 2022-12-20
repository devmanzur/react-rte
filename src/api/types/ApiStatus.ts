export enum ApiStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error',
}

export const defaultApiStatuses = Object.values(ApiStatus);
