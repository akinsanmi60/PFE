import { useForm } from 'react-hook-form';
import { verifyPasswordSchema } from 'validation/changePasswordValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import ControlledInput from '@shared/Input/ControlledInput';
import { useFormData } from '@contexts/formContext';
import CustomButton from '@shared/Button';
import { IFormComponentType, IVerifyProp } from 'types/auth.type';
import { useVerifyMutation } from 'services/auth.service';

function GetVerifyCode({ currentStep, action, previous }: IFormComponentType) {
  const { setFormValues, multiFormValues } = useFormData();
  const { mutate, isLoading } = useVerifyMutation({ action });

  const { control, handleSubmit } = useForm<IVerifyProp>({
    defaultValues: {
      code: '',
      phone_number: multiFormValues?.phone_number as string,
    },
    mode: 'all',
    resolver: yupResolver(verifyPasswordSchema),
  });

  const onSubmit = (values: Partial<IVerifyProp>) => {
    const payload = {
      ...values,
      ...multiFormValues,
    };
    setFormValues(payload);
    mutate({ payload: values });
  };

  return (
    <div className={currentStep === 2 ? 'block h-[400px]' : 'hidden'}>
      <div>
        <h2 className="mb-[10px] text-[20px] tracking-normal font-[700]">
          Verify Phone Number
        </h2>

        <p className="text-[14px] leading-[22px] tracking-normal font-[500]">
          We've sent a 6 digit code to 123456789. Enter the code in that
          message.
        </p>
      </div>
      <form className="flex flex-col justify-between">
        <div className=" mt-[20px]">
          <ControlledInput
            control={control}
            label="Enter code"
            name="code"
            type="text"
          />

          <div>
            <p className="text-[14px] leading-[22px] tracking-normal mt-[40px]  text-center font-[500]">
              Resend code in 0:59
            </p>
          </div>
        </div>

        <div className="mt-[140px] flex justify-end items-baseline">
          <div className="flex justify-between gap-4">
            <CustomButton
              className="border-primary-main border-[1px] w-[150px] bg-primary-white text-primary-main"
              loadingText="Verifying..."
              type="submit"
              onClick={previous}
            >
              Go Back{' '}
            </CustomButton>
            <CustomButton
              className=" w-[300px] bg-primary-main text-primary-white"
              loading={isLoading}
              loadingText="Verifying..."
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

export default GetVerifyCode;
