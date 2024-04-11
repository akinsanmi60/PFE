import { FieldValues, useController } from 'react-hook-form';
import ControlledCheckbox from 'shared/checkBoxFilter/ControlledCheckbox';
import { IControlledCheckbox } from 'shared/Checkbox/interface';
import { twMerge } from 'tailwind-merge';

type IFilterCheckbox<TFieldValues extends FieldValues> =
  IControlledCheckbox<TFieldValues>;

const FilterCheckbox = <TFieldValues extends FieldValues>(
  props: IFilterCheckbox<TFieldValues>,
) => {
  const { label, className, ...checkboxProps } = props;
  const { field } = useController({
    name: checkboxProps.name,
    control: checkboxProps.control,
  });

  const isSelectedAll = checkboxProps.options?.length === field.value?.length;

  const selectAll = () => {
    field.onChange(
      isSelectedAll
        ? []
        : checkboxProps.options.map(objectItem => objectItem.value),
    );
  };

  const showSelectAll = checkboxProps.options.length > 1;
  const checkboxClassName = 'border-[1px] px-[16px] h-max rounded-[8px]';
  const optionClassName =
    'flex-row justify-between w-full border-b-[1px] items-center py-[17px] last:border-0 m-0';

  return (
    <ControlledCheckbox
      {...checkboxProps}
      className={twMerge('w-full', className)}
      checkboxBaseClassName={checkboxClassName}
      optionClassName={twMerge('flex', optionClassName)}
      optionLabelClassName={'ml-0'}
      label={label}
      labelContainerClassName="mb-[8px] px-[16px]"
      labelClassName="text-[13px] text-[#475569] font-[500]"
      labelEndAdornment={
        showSelectAll ? (
          <p
            className={`text-[13px] cursor-pointer ${
              isSelectedAll ? 'text-cancel-red-main' : 'text-[#0000FF]'
            }`}
            onClick={selectAll}
          >
            {isSelectedAll ? 'Deselect All' : 'Select All'}
          </p>
        ) : (
          []
        )
      }
    />
  );
};

FilterCheckbox.defaultProps = {
  type: 'block',
};

export default FilterCheckbox;
