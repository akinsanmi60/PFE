import { useFormData } from '@contexts/formContext';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from 'services/auth.service';
import { IFormComponentType, IRegister } from 'types/auth.type';
import { createPasswordSchema } from 'validation/registerValidation';

function CreatePassword({ previous, currentStep }: IFormComponentType) {
  const { multiFormValues } = useFormData();
  const { mutate, isLoading } = useRegisterMutation();

  const { handleSubmit, control } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    resolver: yupResolver(createPasswordSchema),
  });

  const onSubmit = (values: Partial<IRegister>) => {
    const payload = {
      ...multiFormValues,
      password: values.password,
    };

    mutate({ payload });
  };

  return (
    <div className={currentStep === 3 ? 'block' : 'hidden'}>
      <div>
        <h2 className="mb-[10px] text-[20px] tracking-normal font-[700]">
          Create Password{' '}
        </h2>

        <p className="text-[14px] leading-[22px] tracking-normal font-[500]">
          Passwords must be at least 8 characters long
        </p>
      </div>
      <form action="">
        <div className="gap-[20px] mt-[20px] flex flex-col">
          <div className="">
            <ControlledInput
              control={control}
              label="Enter Password"
              name="password"
              type="password"
            />
          </div>
          <div className="">
            <ControlledInput
              control={control}
              name="confirm_password"
              label="Re-enter Password"
              type="password"
            />
          </div>
        </div>

        <div className="mt-[140px] flex justify-end items-baseline">
          <div className="flex justify-between gap-4">
            <CustomButton
              className="border-primary-main border-[1px] w-[50%] bg-primary-white text-primary-main"
              loadingText="Verifying..."
              type="submit"
              onClick={previous}
            >
              Go Back{' '}
            </CustomButton>
            <CustomButton
              className=" w-[50%]  text-primary-white"
              loading={isLoading}
              loadingText="Creating..."
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Proceed
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePassword;
