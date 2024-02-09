import { ButtonProps } from '@chakra-ui/react';
import React from 'react';

export type IButtonProps = ButtonProps & {
  loading?: boolean;
  loadingText?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error';
  btnText?: string;
};
