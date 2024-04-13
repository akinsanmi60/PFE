import FormStartEndDate from 'shared/Filter/FilterStartEndDate';
import {
  adminProduceHubOptions,
  adminProduceOwnershipOptions,
  produceStatusOptions,
} from '../../../../db/produceData';
import FilterModal from '@shared/ModalBase/FilterModal';
import SingleCheckFilter from '@shared/Filter/singleCheckFilter';
import { IFilterForm } from 'types/modal.type';

const AdminProduceFilterForm = ({
  closeModalBox,
  filterForm,
  onSubmitForm,
  clearFunction,
}: IFilterForm) => {
  const { control } = filterForm;

  const submitForm = () => {
    onSubmitForm(filterForm.getValues());
  };

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
        <div className="flex justify-between w-full mb-[8px]">
          <div className="flex flex-col gap-y-[15px] w-full">
            <div className="">
              <p className="text-[13px] text-[#475569] font-[500]">
                Produce Status
              </p>

              <SingleCheckFilter
                optionProp={produceStatusOptions}
                filterForm={filterForm}
              />
            </div>
            <div className="">
              <p className="text-[13px] text-[#475569] font-[500]">
                Hub Status
              </p>
              <SingleCheckFilter
                optionProp={adminProduceHubOptions}
                filterForm={filterForm}
                watchValue="on_pentrar_hub"
              />
            </div>
            <div className="">
              <p className="text-[13px] text-[#475569] font-[500]">
                Ownership Type
              </p>
              <SingleCheckFilter
                optionProp={adminProduceOwnershipOptions}
                filterForm={filterForm}
                watchValue="produce_ownership"
              />
            </div>
          </div>
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

export default AdminProduceFilterForm;
