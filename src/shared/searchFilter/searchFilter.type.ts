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
    borderColor?: string;
  };
  filterBtnsProps?: {
    useFilterBtn?: boolean;
    onClick?: () => void;
  };
  action?: React.ReactNode;
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
  borderColor?: string;
};
