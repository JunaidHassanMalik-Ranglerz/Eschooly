import axios from 'axios';
import {storage, storageKeys} from '../utils/storage';

export const API_BASE_URL = 'https://ranglerz.click/eschool/public/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
});

let authToken = null;
let authScheme = 'Bearer';

const headerValue = () => (authToken ? `${authScheme || 'Bearer'} ${authToken}` : '');

const writeAuthorization = config => {
  const value = headerValue();
  if (!value || !config.headers) {
    return;
  }

  if (typeof config.headers.set === 'function') {
    config.headers.set('Authorization', value, true);
  }
  config.headers.Authorization = value;
};

export const setAuthToken = (token, tokenType = 'Bearer') => {
  authToken = token ? String(token) : null;
  authScheme = tokenType || 'Bearer';

  if (authToken) {
    const value = headerValue();
    axiosInstance.defaults.headers.Authorization = value;
    axiosInstance.defaults.headers.common.Authorization = value;
    return;
  }

  delete axiosInstance.defaults.headers.Authorization;
  delete axiosInstance.defaults.headers.common.Authorization;
};

export const getAuthToken = () => authToken;

let onUnauthorized = null;

export const setUnauthorizedHandler = handler => {
  onUnauthorized = handler;
};

axiosInstance.interceptors.request.use(async config => {
  if (!authToken) {
    try {
      const savedToken = await storage.getItem(storageKeys.token);
      if (savedToken) {
        authToken = String(savedToken);
        authScheme = 'Bearer';
      }
    } catch (error) {
      // A missing saved token leaves the request unauthenticated.
    }
  }

  const isFormData =
    typeof FormData !== 'undefined' && config.data instanceof FormData;

  if (isFormData && config.headers) {
    if (typeof config.headers.delete === 'function') {
      config.headers.delete('Content-Type');
      config.headers.delete('content-type');
    } else {
      delete config.headers['Content-Type'];
      delete config.headers['content-type'];
    }
  }

  writeAuthorization(config);
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const url = error?.config?.url || '';
    const isLogin = url.includes('/parent/login');
    if (error?.response?.status === 401 && onUnauthorized && !isLogin) {
      onUnauthorized(error);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
