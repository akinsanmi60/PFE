import { twMerge } from 'tailwind-merge';
import FieldLabel from 'shared/FieldLabel';
import { ICheckboxComponentProps } from '../interface';

const CheckboxComponent = ({
  name,
  value,
  onChange,
  checked,
  className,
  checkboxClassName,
  label,
  labelClassName,
}: ICheckboxComponentProps) => {
  return (
    <div
      className={twMerge('flex justify-between w-full items-center', className)}
    >
      {label && (
        <FieldLabel className={twMerge('!mb-0', labelClassName)}>
          {label}
        </FieldLabel>
      )}
      <input
        type="checkbox"
        name={name}
        // inputRef={ref}
        value={value}
        className={twMerge(
          ' rounded border border-gray-300 w-[13px] h-[13px] border-[#2AA232] accent-[#2AA232] cursor-pointer',
          checkboxClassName,
        )}
        onChange={e => onChange?.(e.target.checked)}
        checked={checked}
      />
    </div>
  );
};

export default CheckboxComponent;
