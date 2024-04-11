import { Control, FieldValues, Path, FieldErrorsImpl } from 'react-hook-form';
import { IControlledInput } from './Input/interface';

export interface IBaseControlledField<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  errors?: Partial<FieldErrorsImpl<TFieldValues>>;
}

export type IFilterStartEndDate<TFieldValues extends FieldValues> = Omit<
  IBaseControlledField<TFieldValues>,
  'name'
> & {
  label?: string;
  type?: 'block' | 'inline';
  className?: string;
  cellsClassName?: string;
  startLabel?: string;
  endLabel?: string;
  name: {
    start: Path<TFieldValues>;
    end: Path<TFieldValues>;
  };
};

export type IFilterDate<TFieldValues extends FieldValues> = Omit<
  IControlledInput<TFieldValues>,
  'type'
>;

export type IAlignType =
  | 'center'
  | 'left'
  | 'right'
  | 'justify'
  | 'char'
  | undefined;
