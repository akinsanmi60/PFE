import { ButtonProps } from '@chakra-ui/react';
import React from 'react';

export type IButtonProps = ButtonProps & {
  loading?: boolean;
  loadingText?: React.ReactNode;
  btnColor?: 'primary' | 'secondary' | 'error';
  btnText?: string;
};
