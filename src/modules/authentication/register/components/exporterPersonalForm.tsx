import { useFormData } from '@contexts/formContext';
import { userTypeDataB } from '@db/authData';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import ControlledSelect from '@shared/Select/ControlledSelect';
import { useForm } from 'react-hook-form';
import { usePartialUserCreationMutation } from 'services/auth.service';
import { IFormComponentType, IRegister } from 'types/auth.type';
import { exporterInfoSchema } from 'validation/registerValidation';

function ExporterInfoForm({ currentStep, action }: IFormComponentType) {
  const { setFormValues } = useFormData();
  const { mutate, isLoading } = usePartialUserCreationMutation({ action });

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      email: '',
      coy_name: '',
      user_type: '',
      reg_number: '',
      phone_number: '',
    },
    mode: 'all',
    resolver: yupResolver(exporterInfoSchema),
  });

  const onSubmit = (values: Partial<IRegister>) => {
    let phone_number;
    let payload;
    if (values.phone_number?.startsWith('0')) {
      phone_number = values.phone_number.replace('0', '+234');
      payload = { ...values, phone_number };
    } else {
      payload = values;
    }

    setFormValues(payload);
    mutate({ payload });
  };

  return (
    <div className={currentStep === 1 ? 'block' : 'hidden'}>
      <h2 className="mb-[20px] text-[20px] tracking-normal font-[700]">
        Company Information
      </h2>{' '}
      <form>
        {/* email */}
        <div className="flex gap-[20px] mt-[20px] flex-col">
          <div className="">
            <ControlledSelect
              control={control}
              label="User Type"
              name="user_type"
              optionArray={userTypeDataB}
              placeholder="Please select  user type"
            />
          </div>

          <div className="">
            <ControlledInput
              control={control}
              label="Company Name"
              name="coy_name"
            />
          </div>
          <div className="">
            <ControlledInput
              control={control}
              label="Email Address"
              name="email"
              type="email"
            />
          </div>
          <div className="">
            <ControlledInput
              control={control}
              name="phone_number"
              label="Phone Number"
            />
          </div>

          <div className="">
            <ControlledInput
              control={control}
              label="Registration Number"
              name="reg_number"
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

export default ExporterInfoForm;
