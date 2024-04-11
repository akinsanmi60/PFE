import { FieldValues } from 'react-hook-form';
import ControlledInput from 'shared/Input/ControlledInput';
import { IFilterDate } from 'shared/interface';
import { twMerge } from 'tailwind-merge';

const FilterDate = <TFieldValue extends FieldValues>(
  props: IFilterDate<TFieldValue>,
) => {
  return (
    <ControlledInput
      {...props}
      type="date"
      labelClassName={twMerge(
        'text-[13px] text-[#475569] font-[500]',
        props.labelClassName,
      )}
      labelContainerClassName="px-[16px]"
    />
  );
};

export default FilterDate;
