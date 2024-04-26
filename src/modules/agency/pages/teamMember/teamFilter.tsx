import FormStartEndDate from 'shared/Filter/FilterStartEndDate';
import FilterModal from '@shared/ModalBase/FilterModal';
import SingleCheckFilter from '@shared/Filter/singleCheckFilter';
import { IFilterForm } from 'types/modal.type';
import { adminIndividualOptions, teamAgentOptions } from '@db/produceData';

const TeamFilterForm = ({
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
                Agent Status
              </p>
              <SingleCheckFilter
                optionProp={adminIndividualOptions}
                filterForm={filterForm}
                watchValue="is_active"
              />
            </div>
            <div className="">
              <p className="text-[13px] text-[#475569] font-[500]">
                Agent Type
              </p>
              <SingleCheckFilter
                optionProp={teamAgentOptions}
                filterForm={filterForm}
                watchValue="agency_type"
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

export default TeamFilterForm;
