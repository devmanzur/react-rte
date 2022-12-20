import { useState } from 'react';
import { withAsync } from 'src/utils/withAsync';
import api from './api';
import { useApi } from './hooks/useApi';
import { useApiStatus } from './hooks/useApiStatus';
import { ApiStatus } from './types/ApiStatus';
const URLS = {
  fetchDogUrl: 'breeds/image/random',
  fetchCatUrl: 'images/search?format=json',
};
export type DogData = {
  message: string;
  status: 'success' | 'error';
};
export const fetchDog = () => {
  return api.get<DogData>(URLS.fetchDogUrl, {
    baseURL: 'https://dog.ceo/api/',
  });
};
export type CatData = {
  breeds: [];
  height: number;
  id: string;
  url: string;
  width: number;
}[];
export const fetchCat = () => {
  return api.get<CatData>(URLS.fetchCatUrl, {
    baseURL: 'https://api.thecatapi.com/v1/',
  });
};

// api-hooks

// v1
// export const useFetchDog = () => {
//   const [dog, setDog] = useState<string>();
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [status, setStatus] = useState<ApiStatus>(ApiStatus.Idle);

//   const initFetchDog = async () => {
//     setStatus(ApiStatus.Loading);
//     const { response, error } = await withAsync(() => fetchDog());
//     if (error) {
//       setErrorMessage('' + error);
//       setStatus(ApiStatus.Error);
//     } else {
//       setDog(response?.data.message);
//       setStatus(ApiStatus.Success);
//     }
//   };
//   return {
//     dog,
//     status,
//     errorMessage,
//     initFetchDog,
//   };
// };

// v2
// export const useFetchDog = () => {
//   const [dog, setDog] = useState<string>();
//   const {
//     status: fetchDogStatus,
//     setStatus: setStatus,
//     isIdle: isFetchDogStatusIdle,
//     isPending: isFetchDogStatusPending,
//     isError: isFetchDogStatusError,
//     isSuccess: isFetchDogStatusSuccess,
//   } = useApiStatus(ApiStatus.Idle);

//   const initFetchDog = async () => {
//     setStatus(ApiStatus.Pending);
//     const { response, error } = await withAsync(() => fetchDog());
//     if (error) {
//       setStatus(ApiStatus.Error);
//     } else {
//       setDog(response?.data.message);
//       setStatus(ApiStatus.Success);
//     }
//   };
//   return {
//     dog,
//     fetchDogStatus,
//     initFetchDog,
//     isFetchDogStatusIdle,
//     isFetchDogStatusPending,
//     isFetchDogStatusError,
//     isFetchDogStatusSuccess,
//   };
// };

// v3
export const useFetchDog = () => {
  const {
    data: dog,
    // setData: setDog,
    exec: initFetchDog,
    status: fetchDogStatus,
    // setStatus: setFetchDogStatus,
    isIdle: isFetchDogStatusIdle,
    isPending: isFetchDogStatusPending,
    isError: isFetchDogStatusError,
    isSuccess: isFetchDogStatusSuccess,
  } = useApi(() => fetchDog().then((response) => response.data.message));
  return {
    dog,
    fetchDogStatus,
    initFetchDog,
    isFetchDogStatusIdle,
    isFetchDogStatusPending,
    isFetchDogStatusError,
    isFetchDogStatusSuccess,
  };
};

export const useFetchCat = () => {
  const {
    data: cat,
    // setData: setCat,
    exec: initFetchCat,
    status: fetchCatStatus,
    // setStatus: setFetchCatStatus,
    isIdle: isFetchCatStatusIdle,
    isPending: isFetchCatStatusPending,
    isError: isFetchCatStatusError,
    isSuccess: isFetchCatStatusSuccess,
  } = useApi(() => fetchCat().then((response) => response.data?.[0].url));
  return {
    cat,
    fetchCatStatus,
    initFetchCat,
    isFetchCatStatusIdle,
    isFetchCatStatusPending,
    isFetchCatStatusError,
    isFetchCatStatusSuccess,
  };
};

export { ApiStatus };
