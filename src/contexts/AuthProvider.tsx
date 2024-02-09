import { createContext, useState } from 'react';
import { IUserCTXType, ProviderProps } from 'types/contextProvider.type';
import jwt_decode from 'jwt-decode';
import { getToken } from '@hooks/localStorageHook';

export type ContextType = {
  authUser: IUserCTXType | null;
  setAuthUser: React.Dispatch<React.SetStateAction<IUserCTXType | null>>;
};

const AuthContext = createContext({} as ContextType);

const getUser = () => {
  const userToken = getToken() as string;
  if (userToken) {
    try {
      const decodedUser = jwt_decode(userToken) as unknown as IUserCTXType;
      return decodedUser;
    } catch (error) {
      console.error('Uncaught error:', error);
      return null;
    }
  } else {
    return null; // Token doesn't exist in localStorage
  }
};

const decodedUser = getUser();

export function AuthProvider({ children }: ProviderProps) {
  const [authUser, setAuthUser] = useState<IUserCTXType | null>(decodedUser);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
