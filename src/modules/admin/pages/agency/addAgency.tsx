import { useModalContext } from '@contexts/modalContext';
import { givenState } from '@db/general';
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
    },
    resolver: yupResolver(AddNewAgencySchema),
  });

  const { mutate, isLoading } = useAgencyCreationMutation();

  const submitHandler = (val: ICreateAgency) => {
    mutate({ payload: val });
  };

  return (
    <Drawer
      onClose={() => handleModalClose('createAgency')}
      //   icon={
      //     <div className="bg-[#E6F2FF] p-3 rounded-[40px]">
      //       <AddNewGroupIcon />
      //     </div>
      //   }
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
