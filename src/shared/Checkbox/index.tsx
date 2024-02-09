// import { twMerge } from 'tailwind-merge';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { capitalize } from '@utils/constants';
import { Controller } from 'react-hook-form';

const ControlledCheckbox = forwardRef((props: any, _ref) => {
  const { label, checkboxValue, checked, control, name, className } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <FormControl isInvalid={Boolean(error)}>
          {error?.message && (
            <FormErrorMessage className="font-bold" fontSize={10} mt="0.5">
              {error?.message ? capitalize(error?.message) : ''}
            </FormErrorMessage>
          )}
          <div className="text-[13px] flex gap-[5px] items-center cursor-pointer">
            <input
              type="checkbox"
              name={name}
              checked={checked}
              id={checkboxValue}
              value={checkboxValue}
              className={`${className} border-[#0e2038] accent-[#0e2038] cursor-pointer`}
              onChange={e => onChange(e.target.checked ? e.target.value : '')}
            />
            <label
              htmlFor={checkboxValue}
              className="text-[13px] font-[400] text-start cursor-pointer opacity-100"
            >
              {label}
            </label>
          </div>
        </FormControl>
      )}
    />
  );
});

export default ControlledCheckbox;
