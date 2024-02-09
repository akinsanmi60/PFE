import React from 'react';
import { FieldValues } from 'react-hook-form';
import { IBaseControlledField } from 'shared/interface';

export type IInputProps = {
  label?: string;
  type?: 'text' | 'number' | 'password' | 'email' | 'search' | 'date';
  children?: React.ReactNode;
  helperText?: string;
  useEndAdornment?: React.ReactNode;
  useStartAdornment?: React.ReactNode;
  readonly?: boolean;
  placeholder?: string;
  id?: string;
  role?: string;
  className?: string;
};

export type IControlledInput<TFieldValues extends FieldValues> =
  IBaseControlledField<TFieldValues> & Omit<IInputProps, 'value' | 'name'>;
