/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
axios.defaults.withCredentials = true

let store: any;

export const injectStore = (_store: any) => { 
  store = _store;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_USER_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const access_token = store.getState().auth.access_token;
    
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
