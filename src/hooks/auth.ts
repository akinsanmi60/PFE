import jwtDecode from 'jwt-decode';
import { IUserCTXType } from 'types/contextProvider.type';
import { getToken } from './localStorageHook';

export const setToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

export const getDecodedJwt = (): IUserCTXType => {
  const userToken = getToken() as string;

  try {
    return jwtDecode(userToken);
  } catch (error) {
    return {} as IUserCTXType;
  }
};

export const removeToken = (): void => {
  localStorage.removeItem('token');
};

export const logOut = (): void => {
  try {
    const token = getToken();
    if (token) {
      removeToken();
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
  }
};

export const isAuthenticated = () => {
  const userToken = getToken() as string;
  if (userToken) {
    try {
      const decodedToken: IUserCTXType = jwtDecode(userToken);
      if (decodedToken.exp) {
        const { exp } = decodedToken;
        const currentTime = Date.now() / 1000;
        return exp > currentTime;
      }
    } catch (e) {
      return false;
    }
  }
};
