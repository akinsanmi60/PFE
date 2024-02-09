import { useContext } from 'react';
import { FormContext } from './FormProvider';

export const useFormData = () => useContext(FormContext);
