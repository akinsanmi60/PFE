import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { capitalize } from '@utils/constants';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

type Props = {
  name: string;
  control: Control<any, object>;
  label?: string;
  className?: string;
  select?: boolean;
  placeholder?: string;
  handleonBlur?: () => void;
  inputType?: string;
  checked?: boolean;
  checkboxValue?: string;
  children?: React.ReactNode;
  value?: string;
  id?: string;
  title?: string;
  handleFileChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput: FC<Props> = ({
  label,
  name,
  title,
  control,
  placeholder,
  className,
  inputType = 'textfield',
  id,
  checkboxValue,
  checked,
  handleFileChange,
  handleonBlur,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <FormControl>
          <div>
            {inputType !== 'checkbox' && (
              <FormLabel fontSize={13} htmlFor={name} mb={1}>
                {label}
              </FormLabel>
            )}
          </div>
          <div className="relative">
            {inputType === 'checkbox' && (
              <>
                <div>
                  {error && (
                    <p className="text-red-700 font-bold text-[9px] mt-[2px]">
                      {error.message ? capitalize(error.message) : ''}
                    </p>
                  )}
                </div>
                <div className="text-[13px] flex gap-[5px] items-center">
                  <input
                    type="checkbox"
                    onBlur={handleonBlur}
                    name={name}
                    id={id}
                    checked={checked}
                    value={checkboxValue}
                    className={`${className}`}
                    placeholder={placeholder}
                    onChange={e =>
                      onChange(e.target.checked ? e.target.value : '')
                    }
                    title={title}
                  />
                  <label
                    htmlFor={checkboxValue}
                    className="text-[13px] font-[400] text-start opacity-100"
                  >
                    {label}
                  </label>
                </div>
              </>
            )}

            {inputType === 'pdf' && (
              <>
                <Input
                  name={name}
                  className="input w-full PhoneInputInput text-[12px] border-[1px]"
                  type="file"
                  onChange={e => {
                    if (onChange) {
                      onChange(e);
                    }
                    if (handleFileChange) {
                      handleFileChange(e);
                    }
                  }}
                  accept=".pdf"
                  id="pdf"
                  border={0}
                />
                <div>
                  {error && (
                    <p className="text-red-700 font-bold text-[9px] mt-[2px]">
                      {error.message ? capitalize(error.message) : ''}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </FormControl>
      )}
    />
  );
};

export default CustomInput;
