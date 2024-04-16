import { Input, InputGroup } from '@chakra-ui/react';
import FormField from '@shared/formField';
import { IInputProps } from './interface';
import { LegacyRef, forwardRef } from 'react';

const CustomInput = forwardRef(
  (props: IInputProps, _ref: LegacyRef<HTMLInputElement>) => {
    const {
      helperText,
      label,
      useEndAdornment,
      useStartAdornment,
      readonly,
      placeholder,
      className,
      useDataMaxLength = true,
      ...rest
    } = props;
    const today = new Date().toISOString().split('T')[0];
    return (
      <FormField label={label} error={helperText}>
        <InputGroup>
          {useStartAdornment && useStartAdornment}
          <Input
            {...rest}
            readOnly={readonly}
            placeholder={placeholder}
            className={`placeholder:text-[13px] cursor-pointer ${className}`}
            sx={{
              borderColor: '#E6E6E6',
              borderRadius: '10px',
              paddingY: '24px',
            }}
            max={rest.type === 'date' && useDataMaxLength ? today : undefined}
            min={rest.type === 'date' && !useDataMaxLength ? today : undefined}
          />
          {useEndAdornment && useEndAdornment}
        </InputGroup>
      </FormField>
    );
  },
);

export default CustomInput;
