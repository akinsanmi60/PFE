import { Control, FieldValues, Path, FieldErrorsImpl } from 'react-hook-form';

export interface IBaseControlledField<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  errors?: Partial<FieldErrorsImpl<TFieldValues>>;
}
