import { SelectProps } from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';
import { IBaseControlledField } from 'shared/interface';

export type ISelectOption = {
  label: string;
  value: string;
};

export type ISelectOptionB = string;

export type ISelectProps = SelectProps & {
  label?: string;
  helperText?: string;
  options?: ISelectOption[];
  optionArray?: ISelectOptionB[];
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string[]) => void;
  showSelectAll?: boolean;
  showChipPreview?: boolean;
  useEndAdornment?: React.ReactNode;
  useStartAdornment?: React.ReactNode;
  id?: string;
  role?: string;
};

export type IControlledSelect<TFieldValues extends FieldValues> =
  IBaseControlledField<TFieldValues> &
    Omit<ISelectProps, 'value' | 'name' | 'onChange'>;
