import { IFieldHelperTextProps } from '@shared/FieldHelperText/interface';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { IBaseControlledField } from 'shared/interface';

export type IInputProps = IFieldHelperTextProps & {
  label?: string;
  type?: 'text' | 'number' | 'password' | 'email' | 'search' | 'date';
  children?: React.ReactNode;
  helperText?: string;
  useEndAdornment?: React.ReactNode;
  labelClassName?: string;
  labelContainerClassName?: string;
  useStartAdornment?: React.ReactNode;
  readonly?: boolean;
  placeholder?: string;
  id?: string;
  role?: string;
  className?: string;
  useDataMaxLength?: boolean;
};

export type IControlledInput<TFieldValues extends FieldValues> =
  IBaseControlledField<TFieldValues> & Omit<IInputProps, 'value' | 'name'>;
