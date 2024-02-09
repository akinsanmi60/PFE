import { Theme, ToastPosition } from 'react-toastify';

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
export default toastOptions;
