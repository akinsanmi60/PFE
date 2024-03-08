import FormField from '@shared/formField';
import { ISelectProps } from './interface';
import { InputGroup, Select } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { capitalize } from '@utils/constants';
import { LegacyRef, forwardRef } from 'react';

const CustomSelect = forwardRef(
  (props: ISelectProps, ref: LegacyRef<HTMLInputElement>) => {
    const {
      label,
      helperText,
      useEndAdornment,
      useStartAdornment,
      options,
      optionArray,
      placeholder,
      ...rest
    } = props;
    return (
      <FormField label={label} error={helperText}>
        <InputGroup>
          {useStartAdornment}
          <Select
            ref={ref}
            {...rest}
            icon={<TriangleDownIcon fontSize="x-small" />}
            placeholder={placeholder}
            sx={{
              borderColor: '#E6E6E6',
              borderRadius: '10px',
              paddingY: '24px',
              fontcolor: 'red',
            }}
          >
            {options?.map(option => (
              <option key={option?.label} value={option?.value || ''}>
                {capitalize(option?.label)}
              </option>
            ))}
            {optionArray?.map(opt => (
              <option key={opt} value={opt || ''}>
                {capitalize(opt)}
              </option>
            ))}
          </Select>
          {useEndAdornment}
        </InputGroup>
      </FormField>
    );
  },
);

export default CustomSelect;
