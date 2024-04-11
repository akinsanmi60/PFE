import { Controller, FieldValues } from 'react-hook-form';
import CheckboxComponent from '.';
import { IControlledCheckboxComponent } from '../interface';

const ControlledCheckboxComponent = <TFieldValue extends FieldValues>(
  props: IControlledCheckboxComponent<TFieldValue>,
) => {
  const { control, name: cname, ...rest } = props;
  return (
    <Controller
      control={control}
      name={cname}
      render={({ field: { ...fields } }) => (
        <CheckboxComponent {...fields} {...rest} checked={!!fields.value} />
      )}
    />
  );
};

export default ControlledCheckboxComponent;
