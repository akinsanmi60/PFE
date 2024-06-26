import { useModalContext } from '@contexts/modalContext';
import { givenState } from '@db/general';
import { genderOptions } from '@db/produceData';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import Drawer from '@shared/Drawer';
import ControlledInput from '@shared/Input/ControlledInput';
import ControlledSelect from '@shared/Select/ControlledSelect';
import { useForm } from 'react-hook-form';
import { useAgencyCreationMutation } from 'services/agency.service';
import { ICreateAgency } from 'types/admin.type';
import { AddNewAgencySchema } from 'validation/AdminAgencyValidation';

function AddAgency() {
  const { handleModalClose, modalState } = useModalContext();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: {
      agency_name: '',
      email: '',
      agency_reg_number: '',
      agency_address: '',
      phone_number: '',
      agency_state: '',
      agency_establishment: '',
      head_name: '',
      head_of_agency_phone: '',
      head_of_agency_email: '',
      agency_type: '',
      gender: '',
    },
    resolver: yupResolver(AddNewAgencySchema),
  });

  const { mutate, isLoading } = useAgencyCreationMutation({ resetForm: reset });

  const submitHandler = (val: ICreateAgency) => {
    let phone_number;
    let head_of_agency_phone;
    let payload;
    if (
      val.phone_number?.startsWith('0') &&
      val.head_of_agency_phone?.startsWith('0')
    ) {
      phone_number = val.phone_number.replace('0', '+234');
      head_of_agency_phone = val.head_of_agency_phone.replace('0', '+234');
      payload = { ...val, phone_number, head_of_agency_phone };
    } else {
      payload = val;
    }
    mutate({ payload: payload });
  };

  return (
    <Drawer
      onClose={() => handleModalClose('createAgency')}
      header={'Add New Agency'}
      openDrawerBox={modalState?.openModal}
    >
      <form action="" className="w-full flex flex-col gap-y-4">
        <div className="w-full">
          <ControlledInput
            control={control}
            label="Agency Name"
            name="agency_name"
            type="text"
            placeholder="Enter agency name"
          />
        </div>
        <div>
          <ControlledInput
            control={control}
            name="email"
            label="Agency Email"
            placeholder="Enter user email"
          />
        </div>
        <div>
          <ControlledInput
            control={control}
            name="agency_reg_number"
            label="Registration Number"
            placeholder="Enter agency registration number"
          />
        </div>
        <div>
          <ControlledInput
            control={control}
            name="agency_establishment"
            label="Date of Incorporation"
            placeholder="Enter date of incorporation"
          />
        </div>
        <div>
          <ControlledInput
            control={control}
            name="phone_number"
            label="Agency Phone Number"
            placeholder="Enter agency phone number"
          />
        </div>
        <div>
          <ControlledInput
            control={control}
            name="agency_address"
            label="Agency Address"
            placeholder="Enter agency address"
          />
        </div>
        <div>
          <ControlledSelect
            control={control}
            name="agency_state"
            label="Agency State"
            placeholder="Please select agency address"
            optionArray={givenState()}
          />
        </div>
        <div>
          <ControlledInput
            control={control}
            name="head_name"
            label="Current Head Name"
            placeholder="Enter current head name"
          />
        </div>
        <div>
          <ControlledInput
            control={control}
            name="head_of_agency_phone"
            label="Head of Agency Phone"
            placeholder="Enter head of agency phone"
          />
        </div>
        <div>
          <ControlledInput
            control={control}
            name="head_of_agency_email"
            label="Head of Agency Email"
            placeholder="Enter head of agency email"
          />
        </div>
        <div>
          <ControlledSelect
            control={control}
            name="gender"
            label="Head of Agency Gender"
            placeholder="Please select gender"
            options={genderOptions}
          />
        </div>

        <div>
          <ControlledSelect
            control={control}
            name="agency_type"
            label="Agency Team Type"
            placeholder="Please select agency team type"
            options={[
              { label: 'Lab Agent', value: 'labAgent' },
              { label: 'Field Agent', value: 'fieldAgent' },
            ]}
          />
        </div>

        <CustomButton
          className='"w-full text-primary-white mt-[30px]'
          onClick={handleSubmit(submitHandler)}
          disabled={!isValid || !isDirty}
          loadingText="Loading..."
          loading={isLoading}
          variant={!isDirty || !isValid ? 'solid' : ''}
        >
          Create Agency
        </CustomButton>
      </form>
    </Drawer>
  );
}

export default AddAgency;
