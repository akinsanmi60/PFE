import { useState, createContext } from 'react';
import {
  IFormContextType,
  IFormContextValue,
  ProviderProps,
} from 'types/contextProvider.type';

export const FormContext = createContext({} as IFormContextType);

export default function FormProvider({ children }: ProviderProps) {
  const [multiFormValues, setmultiFormValues] = useState(
    {} as IFormContextValue,
  );

  const setFormValues = (values: IFormContextValue) => {
    setmultiFormValues(prevValues => ({
      ...prevValues,
      ...values,
    }));
  };

  return (
    <FormContext.Provider
      value={{ multiFormValues, setFormValues, setmultiFormValues }}
    >
      {children}
    </FormContext.Provider>
  );
}
