import FilterModal from '@shared/ModalBase/FilterModal';
import { IFilterForm } from 'types/modal.type';
import FormStartEndDate from 'shared/Filter/FilterStartEndDate';
import { certificationStatusOptions } from '@db/produceData';
import SingleCheckFilter from '@shared/Filter/singleCheckFilter';

function AgentTaskFilterForm({
  closeModalBox,
  filterForm,
  onSubmitForm,
  clearFunction,
  userType,
}: IFilterForm) {
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
      {userType === 'labAgent' && (
        <div className="">
          <p className="text-[13px] text-[#475569] font-[500] px-4">
            Certification Status
          </p>

          <SingleCheckFilter
            optionProp={certificationStatusOptions.slice(2)}
            filterForm={filterForm}
          />
        </div>
      )}
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
}

export default AgentTaskFilterForm;
