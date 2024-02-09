import React from 'react';
import { ReactNode } from 'react';

import { capitalize } from '@utils/constants';
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

type Props = {
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'search';
  className?: string;
  multiline?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  InputProps?: object;
  disabled?: boolean;
  select?: boolean;
  children?: ReactNode;
  placeholder?: string;
  handleChange?: (_event: any) => void;
  handleonBlur?: (_event: any) => void;
  value?: string;
  onKeyDown?: (_event: React.KeyboardEvent<HTMLInputElement>) => void;
  selectId?: string;
  selectOptions?: string[];
  inputType?: string;
  checked?: boolean;
  readonly?: boolean;
  checkboxValue?: string;
  id?: string;
  title?: string;
  handleFileChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ControlledWithoutHook({
  label,
  name,
  title,
  type,
  placeholder,
  className,
  selectOptions,
  selectId,
  inputType = 'textfield',
  id,
  checkboxValue,
  checked,
  value,
  handleonBlur,
  handleChange,
  ...rest
}: Props) {
  return (
    <FormControl>
      <div>
        {inputType !== 'checkbox' && (
          <FormLabel fontSize={13} htmlFor={name} mb={1}>
            {label}
          </FormLabel>
        )}
      </div>
      <div className="relative">
        {inputType === 'text' && (
          <Input
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleonBlur}
            type={type}
            name={name}
            value={value}
            className={`${className} border-[#0e2038]`}
            sx={{
              borderColor: '#0e2038',
            }}
            {...rest}
          />
        )}
        {inputType === 'select' && (
          <Select
            id={selectId}
            onBlur={handleonBlur}
            name={name}
            value={value}
            onChange={handleChange}
            className={className}
            style={{
              outline: 'none',
            }}
            sx={{
              borderColor: '#0e2038',
            }}
            placeholder={placeholder}
          >
            {selectOptions?.map((option, id) => (
              <option key={id} value={option}>
                {capitalize(option)}
              </option>
            ))}
          </Select>
        )}
        {inputType === 'checkbox' && (
          <input
            type="checkbox"
            name={name}
            id={id}
            checked={checked}
            value={checkboxValue}
            className={`${className} border-[#0e2038] accent-[#0e2038]`}
            placeholder={placeholder}
            onChange={handleChange}
            title={title}
          />
        )}
      </div>
    </FormControl>
  );
}

export default ControlledWithoutHook;
