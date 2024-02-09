import { Controller, FieldValues } from 'react-hook-form';
import { IControlledInput } from './interface';
import CustomInput from '.';

const ControlledInput = <TFieldValue extends FieldValues>(
  props: IControlledInput<TFieldValue>,
) => {
  const { control, name: cname, ...rest } = props;
  return (
    <Controller
      control={control}
      name={cname}
      render={({ field: { ...fields }, fieldState }) => (
        <CustomInput
          {...rest}
          {...fields}
          helperText={fieldState?.error?.message}
        />
      )}
    />
  );
};

export default ControlledInput;
