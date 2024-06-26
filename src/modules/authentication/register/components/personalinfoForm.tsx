import { useFormData } from '@contexts/formContext';
import { genderData } from '@db/authData';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import ControlledSelect from '@shared/Select/ControlledSelect';
import { useForm } from 'react-hook-form';
import { usePartialUserCreationMutation } from 'services/auth.service';
import { IFormComponentType, IRegister } from 'types/auth.type';
import { personalInfoSchema } from 'validation/registerValidation';
import { capitalize } from '../../../../utils/constants';

function PersonalinfoForm({
  currentStep,
  action,
  currentTab,
}: IFormComponentType) {
  const { setFormValues } = useFormData();
  const { mutate, isLoading } = usePartialUserCreationMutation({ action });

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      email: '',
      full_name: '',
      user_type: capitalize(currentTab?.toLocaleLowerCase()) || '',
      gender: '',
      phone_number: '',
    },
    mode: 'all',
    resolver: yupResolver(personalInfoSchema),
  });

  const onSubmit = (values: Partial<IRegister>) => {
    let phone_number;
    let payload;
    const user_type = currentTab as string;

    if (values.phone_number?.startsWith('0')) {
      phone_number = values.phone_number.replace('0', '+234');
      payload = { ...values, phone_number, user_type };
    } else {
      payload = values;
    }

    setFormValues(payload);
    mutate({ payload });
  };

  return (
    <div className={currentStep === 1 ? 'block' : 'hidden'}>
      <h2 className="mb-[20px] text-[20px] tracking-normal font-[700]">
        Personal Information
      </h2>{' '}
      <form>
        {/* email */}
        <div className="flex gap-[20px] mt-[20px] flex-col">
          <div className="">
            <ControlledInput
              control={control}
              label="User Type"
              name="user_type"
              placeholder="Please select  user type"
              readonly
            />
          </div>

          <div className="">
            <ControlledInput
              control={control}
              label="Full Name"
              name="full_name"
              placeholder="Enter your full name"
            />
          </div>
          <div className="">
            <ControlledInput
              control={control}
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email address"
            />
          </div>
          <div className="">
            <ControlledInput
              control={control}
              name="phone_number"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="">
            <ControlledSelect
              control={control}
              label="Gender"
              name="gender"
              optionArray={genderData}
              placeholder="Please select  gender"
            />
          </div>
        </div>

        <div className="flex justify-end mt-[40px]">
          <CustomButton
            type="button"
            className=" w-[30%]  text-primary-white"
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={!isValid || !isDirty}
            variant={!isValid || !isDirty || isLoading ? 'solid' : ''}
          >
            Proceed
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default PersonalinfoForm;
