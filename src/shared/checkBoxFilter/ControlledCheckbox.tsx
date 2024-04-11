import { Controller, FieldValues } from 'react-hook-form';
import Checkbox from '.';
import { IControlledCheckbox } from './interface';

const ControlledCheckbox = <TFieldValue extends FieldValues>(
  props: IControlledCheckbox<TFieldValue>,
) => {
  const { control, name: cname, options, ...rest } = props;
  return (
    <Controller
      control={control}
      name={cname}
      // eslint-disable-next-line no-unused-vars
      render={({ field: { ref, onChange, value, ...fields } }) => (
        <Checkbox
          {...fields}
          {...rest}
          onChange={onChange}
          options={options}
          value={value}
        />
      )}
    />
  );
};

export default ControlledCheckbox;
