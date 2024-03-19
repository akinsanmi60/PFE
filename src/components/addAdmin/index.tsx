import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import ModalBaseWrapper from '@shared/ModalBase';
import ControlledSelect from '@shared/Select/ControlledSelect';
import ModalHeader from 'components/appNav/modalHeader';
import { useForm } from 'react-hook-form';
import { useAdminCreationMutation } from 'services/admin.service';
import { IAddSubAdminPayload } from 'types/subAdmin.type';
import { addAdminValidationSchema } from 'validation/addAdminValidation';

function AddAdminComponent() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      phone_number: '',
      full_name: '',
      role: '',
    },
    resolver: yupResolver(addAdminValidationSchema),
  });

  const { mutate, isLoading } = useAdminCreationMutation();

  const onAddSubAdmin = (value: IAddSubAdminPayload) => {
    const payload = {
      ...value,
    };
    mutate({ payload: payload as IAddSubAdminPayload });
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        showCloseBtn: false,
        className: 'w-[600px]',
      }}
    >
      <div className="p-[6px]">
        <ModalHeader
          modalHeaderProp={{
            title: 'Add Admin',
            actionText: 'addSubAdmin',
          }}
        />

        <div className="flex gap-y-[25px] mt-[20px] flex-col  w-[540px]">
          <ControlledInput
            name="full_name"
            label="Full Name"
            placeholder="Enter user full name"
            control={control}
          />

          <ControlledInput
            name="email"
            label="Email"
            placeholder="Enter user email"
            control={control}
          />

          <ControlledInput
            name="phone_number"
            label="Phone Number"
            placeholder="Enter phone number"
            control={control}
          />

          <ControlledSelect
            name="role"
            label="Role"
            placeholder="Enter user role"
            control={control}
            options={[{ value: 'subAdmin', label: 'Sub Admin' }]}
          />

          <div className="flex justify-end mt-[8px] mb-[-50px]">
            <CustomButton
              onClick={handleSubmit(onAddSubAdmin)}
              className="text-primary-white w-[180px]"
              loading={isLoading}
            >
              Save Admin
            </CustomButton>
          </div>
        </div>
      </div>
    </ModalBaseWrapper>
  );
}

export default AddAdminComponent;
