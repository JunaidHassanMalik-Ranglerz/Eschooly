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

const applyAuthHeader = config => {
  if (!authToken) {
    return;
  }

  const value = `${authScheme} ${authToken}`;
  if (config.headers?.set) {
    config.headers.set('Authorization', value);
    return;
  }

  config.headers = config.headers || {};
  config.headers.Authorization = value;
};

let onUnauthorized = null;

export const setAuthToken = (token, tokenType = 'Bearer') => {
  authToken = token || null;
  authScheme = tokenType || 'Bearer';

  if (authToken) {
    axiosInstance.defaults.headers.Authorization = `${authScheme} ${authToken}`;
    return;
  }

  delete axiosInstance.defaults.headers.Authorization;
};

export const setUnauthorizedHandler = handler => {
  onUnauthorized = handler;
};

axiosInstance.interceptors.request.use(async config => {
  if (!authToken) {
    try {
      const savedToken = await storage.getItem(storageKeys.token);
      if (savedToken) {
        authToken = savedToken;
        authScheme = 'Bearer';
      }
    } catch (error) {
      // The request still goes out; the API will reject it if auth is required.
    }
  }

  const isFormData =
    typeof FormData !== 'undefined' && config.data instanceof FormData;

  if (isFormData) {
    if (config.headers?.delete) {
      config.headers.delete('Content-Type');
      config.headers.delete('content-type');
    } else if (config.headers) {
      delete config.headers['Content-Type'];
      delete config.headers['content-type'];
    }
  } else if (config.data && !config.headers?.['Content-Type']) {
    if (config.headers?.set) {
      config.headers.set('Content-Type', 'application/json');
    } else {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'application/json';
    }
  }

  applyAuthHeader(config);
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
