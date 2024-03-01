import { getToken } from '@hooks/localStorageHook';
import axios from 'axios';

const customAxiosMethod = axios.create({
  baseURL: import.meta.env.VITE_FRONTEND_URL as string | undefined,
});

// Add request interceptor
customAxiosMethod.interceptors.request.use(
  req => {
    // Add authorization key to config object if it exist
    const token = localStorage.getItem('token');
    if (token) {
      req.headers.Authorization = `Bearer ${getToken() as string}`;
    }
    return req;
  },
  error => Promise.reject(error),
);

// Add response interceptor
customAxiosMethod.interceptors.response.use(
  response => {
    return response;
  },
  error => Promise.reject(error),
);
export default customAxiosMethod;
