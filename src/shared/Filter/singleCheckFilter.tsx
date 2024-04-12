import ControlledCheckbox from '@shared/Checkbox';
import { UseFormReturn } from 'react-hook-form';
import { IFilterValues } from 'types/modal.type';

type ISingleFilterProp = {
  optionProp: {
    label: string;
    value: string;
  }[];
  filterForm: UseFormReturn<IFilterValues>;
  watchValue?: string;
};

function SingleCheckFilter({
  filterForm,
  optionProp,
  watchValue = 'status',
}: ISingleFilterProp) {
  const { control, watch } = filterForm;

  const formValue = watch(watchValue as keyof IFilterValues);

  return (
    <div className="border-[1px] px-[16px] rounded-[8px] cursor-pointer">
      {optionProp.map(type => {
        return (
          <div
            key={type.label}
            className="w-full border-b-[1px] items-center last:border-0 m-0"
          >
            <div className="flex items-center justify-between cursor-pointer w-full  border-[#DFE2E2] py-[16px] rounded-xl last:mt-[0px] ">
              <div>
                <label
                  htmlFor={type.value}
                  className="text-[13px] text-[#475569] font-[500] cursor-pointer"
                >
                  {type.label}
                </label>
              </div>
              <div>
                <ControlledCheckbox
                  control={control}
                  name={watchValue}
                  checkboxValue={type.value}
                  id={type.value}
                  checked={type.value === formValue}
                  className=" accent-secondary-light-1"
                  showError={false}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SingleCheckFilter;
