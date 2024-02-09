import { FieldValues } from 'react-hook-form';
import { IBaseControlledField } from 'shared/interface';

export type ICheckboxOption = {
  label: string;
  value: string;
};

export type ICheckboxBaseProps = {
  name?: string;
  className?: string;
  optionClassName?: string;
  optionLabelClassName?: string;
  disabled?: boolean;
  onChange?: (_value: string[]) => void;
  value?: string[];
  options: ICheckboxOption[];
};

export type ICheckboxProps = ICheckboxBaseProps & {
  label?: string;
  labelContainerClassName?: string;
  labelClassName?: string;
  checkboxBaseClassName?: string;
  labelEndAdornment?: React.ReactNode;
  error?: boolean;
  helperText?: React.ReactNode;
};

export type IControlledCheckbox<TFieldValues extends FieldValues> =
  IBaseControlledField<TFieldValues> & Omit<ICheckboxProps, 'value' | 'name'>;
