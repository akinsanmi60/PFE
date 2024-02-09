import { useState, createContext } from 'react';
import {
  IModalContextType,
  IModalContextValue,
  ProviderProps,
} from 'types/contextProvider.type';

export const ModalContext = createContext({} as IModalContextType);

export default function ModalProvider({ children }: ProviderProps) {
  const [modalState, setModalState] = useState<IModalContextValue>({
    openModal: false,
    message: '',
    modalType: '',
  });

  const handleModalClose = (type: string) => {
    setModalState({
      ...modalState,
      openModal: false,
      modalType: type,
    });
  };
  const handleModalOpen = (type: string) => {
    setModalState({
      ...modalState,
      openModal: true,
      modalType: type,
    });
  };

  return (
    <ModalContext.Provider
      value={{ modalState, setModalState, handleModalClose, handleModalOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
}
