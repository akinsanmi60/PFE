import React from 'react';
import { FieldValues } from 'react-hook-form';
import { IBaseControlledField } from 'shared/interface';

export type ITextAreaProps = {
  label?: string;
  children?: React.ReactNode;
  helperText?: string;
  disable?: boolean;
  placeholder?: string;
  height?: string | number;
};

export type IControlledInput<TFieldValues extends FieldValues> =
  IBaseControlledField<TFieldValues> & Omit<ITextAreaProps, 'value' | 'name'>;
