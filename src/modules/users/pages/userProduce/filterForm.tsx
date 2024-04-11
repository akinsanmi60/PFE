import FormCheckbox from 'shared/Filter/FilterCheckbox';
import FormStartEndDate from 'shared/Filter/FilterStartEndDate';
import { IFilterForm } from '../../../../types/modal.type';
import { produceStatusOptions } from '../../../../db/produceData';
import FilterModal from '@shared/ModalBase/FilterModal';

const UserProduceFilterForm = ({
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
      <FormCheckbox
        control={control}
        name="status"
        label="Status Type"
        options={produceStatusOptions}
      />

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
