import { LOCAL_STORAGE_KEY } from '@utils/localStorageKey';
import { useState, createContext } from 'react';
import {
  ISaveDetailContextType,
  ISaveDetailContextValue,
  ProviderProps,
} from 'types/contextProvider.type';

export const DetailSavedContext = createContext({} as ISaveDetailContextType);

const getDetailsFromLocalStorage = () => {
  const url = localStorage.getItem(LOCAL_STORAGE_KEY.URL);

  return { url };
};

const { url } = getDetailsFromLocalStorage();

export default function SaveDetailProvider({ children }: ProviderProps) {
  const [saveDetails, setSaveDetails] = useState<ISaveDetailContextValue>({
    url,
  });

  return (
    <DetailSavedContext.Provider value={{ saveDetails, setSaveDetails }}>
      {children}
    </DetailSavedContext.Provider>
  );
}
