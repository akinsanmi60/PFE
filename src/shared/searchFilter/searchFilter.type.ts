/* eslint-disable no-unused-vars */
import { IInputProps } from '@shared/Input/interface';

export type IsearchFilterBox = {
  searchBarProps: {
    placeholder: string;
    onSetTermChange: ({
      target: { value },
    }: {
      target: {
        value: any;
      };
    }) => void;
    term: string;
    useEndAdornment?: React.ReactNode;
    useStartAdornment?: React.ReactNode;
    className?: string;
  };
};

export type InputSearchboxProp = IInputProps & {
  placeholder?: string;
  onSetTermChange: ({
    target: { value },
  }: {
    target: {
      value: any;
    };
  }) => void;
  term: string;
  useEndAdornment?: React.ReactNode;
  useStartAdornment?: React.ReactNode;
  className?: string;
  debounceChange?: boolean;
};
