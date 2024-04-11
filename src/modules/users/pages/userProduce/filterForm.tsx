// import FormCheckbox from 'shared/Filter/FilterCheckbox';
import FormStartEndDate from 'shared/Filter/FilterStartEndDate';
import { IFilterForm } from '../../../../types/modal.type';
import { produceStatusOptions } from '../../../../db/produceData';
import FilterModal from '@shared/ModalBase/FilterModal';
import ControlledCheckbox from '@shared/Checkbox';

const UserProduceFilterForm = ({
  closeModalBox,
  filterForm,
  onSubmitForm,
  clearFunction,
}: IFilterForm) => {
  const { control, watch } = filterForm;

  const submitForm = () => {
    onSubmitForm(filterForm.getValues());
  };

  const formValue = watch('status');

  return (
    <FilterModal
      form={filterForm}
      modalBaseProp={{
        onClose: closeModalBox,
        clearAll: clearFunction,
      }}
      action={{
        onClick: submitForm,
        className: 'text-primary-white',
      }}
    >
      <div>
        <div className="flex justify-between w-full mb-[8px] px-[16px]">
          <p className="text-[13px] text-[#475569] font-[500]">
            Produce Status
          </p>
        </div>{' '}
        <div className="border-[1px] px-[16px] rounded-[8px] cursor-pointer">
          {produceStatusOptions.map(type => {
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
                      name="status"
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
      </div>
      <FormStartEndDate
        control={control}
        label="Created On"
        name={{
          start: 'created_at',
          end: 'updated_at',
        }}
        startLabel="Select Start Date"
        endLabel="Select End Date"
      />
    </FilterModal>
  );
};

export default UserProduceFilterForm;
