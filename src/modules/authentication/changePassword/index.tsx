// import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { changePasswordSchema } from 'validation/changePasswordValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import ControlledInput from '@shared/Input/ControlledInput';
import CustomButton from '@shared/Button';
import { useChangePasswordMutation } from 'services/auth.service';
import { IChangePassword } from 'types/auth.type';

function ChangePassword() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      old_password: '',
      new_password: '',
    },
    mode: 'all',
    resolver: yupResolver(changePasswordSchema),
  });

  const { isLoading, mutate } = useChangePasswordMutation();

  const onSubmit = (values: IChangePassword) => {
    mutate({ payload: values });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg w-[350px] p-[20px] rounded-[15px]"
    >
      <h1 className="font-[500] text-[20px] tracking-normal">
        Change Password
      </h1>
      <div className="flex flex-col gap-[12px] mt-[8px] ">
        <div className="">
          <ControlledInput
            control={control}
            label="Old Password"
            name="old_password"
            type="text"
          />
        </div>
        <div className="">
          <ControlledInput
            control={control}
            label="New Password"
            name="new_password"
            type="password"
          />
        </div>
        <div className="">
          <ControlledInput
            control={control}
            name="confirm_password"
            label="Confirm New Password"
            type="password"
          />
        </div>
      </div>

      <div className="mt-[30px]">
        <CustomButton
          className="w-full btn-primary-min"
          loadingText="Loading..."
          loading={isLoading}
          type="submit"
        >
          Submit
        </CustomButton>
      </div>
    </form>
  );
}

export default ChangePassword;
