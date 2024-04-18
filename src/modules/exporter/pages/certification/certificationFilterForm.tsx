import SingleCheckFilter from '@shared/Filter/singleCheckFilter';
import FilterModal from '@shared/ModalBase/FilterModal';
import { IFilterForm } from 'types/modal.type';
import FormStartEndDate from 'shared/Filter/FilterStartEndDate';
import { certificationtatusOptions } from '@db/produceData';

function CertificationFilterForm({
  closeModalBox,
  filterForm,
  onSubmitForm,
  clearFunction,
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
      <div>
        <div className="flex justify-between w-full mb-[8px] px-[16px]">
          <p className="text-[13px] text-[#475569] font-[500]">
            Certification Status
          </p>
        </div>{' '}
        <SingleCheckFilter
          optionProp={certificationtatusOptions}
          filterForm={filterForm}
        />
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
}

export default CertificationFilterForm;
