import { Controller, FieldValues } from 'react-hook-form';
import { IControlledInput } from './interface';
import CustomTextArea from '.';

const ControlledTextArea = <TFieldValue extends FieldValues>(
  props: IControlledInput<TFieldValue>,
) => {
  const { control, name: cname, ...rest } = props;
  return (
    <Controller
      control={control}
      name={cname}
      render={({ field: { ...fields }, fieldState }) => (
        <CustomTextArea
          {...rest}
          {...fields}
          helperText={fieldState?.error?.message}
        />
      )}
    />
  );
};

export default ControlledTextArea;
