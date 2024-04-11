import { FieldValues } from 'react-hook-form';
import { IFieldHelperTextProps } from 'shared/FieldHelperText/interface';
import { IBaseControlledField } from 'shared/interface';

export type ICheckboxOption = {
  label: string;
  value: string | boolean;
};

export type ICheckboxBaseProps = {
  name?: string;
  className?: string;
  optionClassName?: string;
  optionLabelClassName?: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string[]) => void;
  value?: string[];
  options: ICheckboxOption[];
};

export type ICheckboxProps = ICheckboxBaseProps &
  IFieldHelperTextProps & {
    label?: string;
    labelContainerClassName?: string;
    labelClassName?: string;
    checkboxBaseClassName?: string;
    labelEndAdornment?: React.ReactNode;
    EoL?: {
      show?: boolean;
      // eslint-disable-next-line no-unused-vars
      onVisible: (entryItem: IntersectionObserverEntry) => void;
      showLoader: boolean;
    };
  };

export type IControlledCheckbox<TFieldValues extends FieldValues> =
  IBaseControlledField<TFieldValues> & Omit<ICheckboxProps, 'value' | 'name'>;

export type ICheckboxComponentProps = {
  name?: string;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: boolean) => void;
  value?: string;
  checked?: boolean;
  checkboxClassName?: string;
  label?: string;
  labelClassName?: string;
};

export type IControlledCheckboxComponent<TFieldValues extends FieldValues> =
  IBaseControlledField<TFieldValues> &
    Omit<ICheckboxComponentProps, 'value' | 'name'>;
