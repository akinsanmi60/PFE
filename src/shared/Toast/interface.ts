import { ToastProps } from '@chakra-ui/react';

export type IToastProp = ToastProps & {
  description: string;
  status: string;
};
