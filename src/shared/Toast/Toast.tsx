import handleApiError from '@utils/handleApiError';
import { Theme, ToastPosition, toast } from 'react-toastify';

type ToastProp = {
  position: ToastPosition | undefined;
  autoClose: number;
  pauseOnHover: boolean;
  draggable: boolean;
  theme: Theme | undefined;
};

const toastOptions: ToastProp = {
  position: 'top-right',
  autoClose: 2000,
  pauseOnHover: false,
  draggable: true,
  theme: 'light',
};

const displayError = (error: any) => {
  const content = handleApiError(error);
  return toast.error(content, toastOptions);
};

const displaySuccess = (message: string) => {
  return toast.success(message, toastOptions);
};
export { toastOptions, displayError, displaySuccess };
