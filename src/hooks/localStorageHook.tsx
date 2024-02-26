import { LOCAL_STORAGE_KEY } from '@utils/localStorageKey';

export const pushToLocalStorage = (user?: any) => {
  localStorage.setItem('user', JSON.stringify(user));
};
export const setToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
};
export const getToken = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN) as string;
};

export const saveDetailToLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const getDetailFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};
