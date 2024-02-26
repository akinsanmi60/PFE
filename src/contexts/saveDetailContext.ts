import { useContext } from 'react';
import { DetailSavedContext } from './saveDetailProvider';

export const useDetailContext = () => useContext(DetailSavedContext);
