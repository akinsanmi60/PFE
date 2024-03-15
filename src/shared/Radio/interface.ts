import { FieldValues } from 'react-hook-form';
import { IBaseControlledField } from 'shared/interface';

export type IRadioOption = {
  label: string;
  value: string;
};

export type IRadioProps = {
  label?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (_e: any) => void;
  value?: string;
  error?: boolean;
  helperText?: React.ReactNode;
  checked?: boolean;
  checkValue?: string;
};

export type IControlledRadio<TFieldValues extends FieldValues> =
  IBaseControlledField<TFieldValues> & Omit<IRadioProps, 'value' | 'name'>;
