import { useContext } from 'react';
import { ModalContext } from './ModalProvider';

export const useModalContext = () => useContext(ModalContext);
