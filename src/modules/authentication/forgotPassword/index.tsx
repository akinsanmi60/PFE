import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import { useForm } from 'react-hook-form';
import { useForgetPasswordMutation } from 'services/auth.service';
import { IForgetProp } from 'types/auth.type';
import { forgetPasswordSchema } from 'validation/changePasswordValidation';

function ForgotPassword() {
  const { handleSubmit, control } = useForm<IForgetProp>({
    defaultValues: {
      email: '',
    },
    mode: 'all',
    resolver: yupResolver(forgetPasswordSchema),
  });

  const { mutate, isLoading } = useForgetPasswordMutation();

  const onSubmitForm = (values: IForgetProp) => {
    mutate({ payload: values });
  };

  return (
    <div className="max-w-[420px] p-[10px]">
      <p className="text-[16px] leading-[22px] tracking-normal">
        Enter your email address below and we will email you a link to reset
        your password.
      </p>
      <form action="" onSubmit={handleSubmit(onSubmitForm)}>
        <div className=" mt-[20px] ">
          <div className="">
            <ControlledInput
              control={control}
              label="Email"
              name="email"
              type="email"
            />
          </div>
        </div>
        <div className=" mt-[20px]">
          <CustomButton
            className="btn-primary-min w-full"
            loading={isLoading}
            loadingText="Sending..."
            type="submit"
          >
            Send
          </CustomButton>{' '}
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
