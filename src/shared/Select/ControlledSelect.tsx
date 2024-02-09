import { Controller, FieldValues } from 'react-hook-form';
import { IControlledSelect } from './interface';
import CustomSelect from '.';

const ControlledSelect = <TFieldValue extends FieldValues>(
  props: IControlledSelect<TFieldValue>,
) => {
  const { control, name: cname, ...rest } = props;
  return (
    <Controller
      control={control}
      name={cname}
      render={({ field: { ...fields }, fieldState }) => (
        <CustomSelect
          {...rest}
          {...fields}
          helperText={fieldState?.error?.message}
        />
      )}
    />
  );
};

export default ControlledSelect;
