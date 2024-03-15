import { Controller, FieldValues } from 'react-hook-form';
import { IControlledRadio } from './interface';
import { Radio } from '@chakra-ui/react';
import { capitalize } from '@utils/constants';

const ControlledRadio = <TFieldValue extends FieldValues>(
  props: IControlledRadio<TFieldValue>,
) => {
  const { control, name: cname, label, checked, checkValue, ...rest } = props;
  return (
    <Controller
      control={control}
      name={cname}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <>
          <Radio
            {...rest}
            checked={checked}
            value={checkValue}
            id={checkValue}
            onChange={e => onChange(e.target.checked ? e.target.value : '')}
          >
            {label && capitalize(label)}
          </Radio>
          {error?.message && (
            <span className="text-red-500">{error?.message}</span>
          )}
        </>
      )}
    />
  );
};

export default ControlledRadio;
