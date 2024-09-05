//@ts-nocheck
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { queryClient } from '@/providers/QueryProvider';
import storage from '@/libs/storage';
import {
  API_URL,
  REFRESH_ACCESS_TOKEN_QUERY_KEY,
  TOKEN_STORAGE_KEY,
  UNAUTHORIZED_ERROR_CODE,
} from '@/constants/variables';
import { navigateToLogin } from '@/libs/logout';

const request = axios.create({
  baseURL: API_URL,
});

request.interceptors.request.use((config) => {
  const { access_token } = storage.get(TOKEN_STORAGE_KEY) ?? {};

  let requiresNoToken = (config.headers?.['noToken'] as boolean) ?? false;
  const allowAccessToken = (config.headers?.['allowAccessToken'] as boolean) ?? false;

  if (requiresNoToken && allowAccessToken) {
    requiresNoToken = false;
  }

  const newConfig: AxiosRequestConfig = {
    ...config,
    headers: {
      ...config.headers,
    },
  };

  if (!newConfig.headers) return newConfig;

  delete newConfig.headers['noToken'];
  delete newConfig.headers['allowAccessToken'];

  if (!access_token || requiresNoToken) return newConfig;

  newConfig.headers['Authorization'] = `Bearer ${access_token}`;

  return newConfig;
});

// Add a response interceptor
request.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error: AxiosError) {
    const originalConfig = error.config;

    const { access_token } = storage.get(TOKEN_STORAGE_KEY) || {};

    if (error.response?.status === UNAUTHORIZED_ERROR_CODE && access_token) {
      try {
        // refresh token logic

        // await queryClient.fetchQuery({
        //   queryKey: [REFRESH_ACCESS_TOKEN_QUERY_KEY],
        // });

        // const { access_token } = storage.get(TOKEN_STORAGE_KEY);

        // originalConfig.headers = {
        //   ...originalConfig.headers,
        //   Authorization: `Bearer ${access_token}`,
        // };

        // return await axios.requxest(originalConfig);

        // logout
        navigateToLogin();
      } catch (error) {
        // logout
        navigateToLogin();
      }
    }

    return Promise.reject(error);
  },
);

export default request;
