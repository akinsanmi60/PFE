/* eslint-disable no-unused-vars */
import { FieldValues } from 'react-hook-form';
import { IInputProps } from 'shared/Input/interface';
import { IBaseControlledField } from 'shared/interface';

export type IControlledInputEmail<TFieldValues extends FieldValues> =
  IBaseControlledField<TFieldValues> &
    Omit<IInputProps, 'value' | 'name'> & {
      verified?: boolean;
      optional?: boolean;
      errorValue?: string;
    };
