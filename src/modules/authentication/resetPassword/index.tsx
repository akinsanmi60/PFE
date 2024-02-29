import CustomButton from '@shared/Button';
import ControlledInput from '@shared/Input/ControlledInput';
import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from 'services/auth.service';
import { IResetProp } from 'types/auth.type';
import { resetPasswordSchema } from 'validation/changePasswordValidation';
import pentrarLogo from '@assets/svg/LogoPentrar.svg';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function ResetPassword() {
  const [pshow, setPshow] = useState(false);
  const handleClickP = () => setPshow(!pshow);

  const { handleSubmit, control } = useForm<IResetProp>({
    defaultValues: {
      code: '',
      new_password: '',
    },
    mode: 'all',
    resolver: yupResolver(resetPasswordSchema),
  });

  const { mutate, isLoading } = useResetPasswordMutation();

  const onSubmitForm = (values: IResetProp) => {
    mutate({ payload: values });
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <>
        <img
          src={pentrarLogo}
          alt="logo"
          onClick={() => navigate('/')}
          className="cursor-pointer"
        />
      </>
      <div className="max-w-[420px] p-[10px] mt-[40px]">
        <p className="text-[16px] leading-[22px] tracking-normal">
          Enter your email address below and we will email you a link to reset
          your password.
        </p>
        <form action="" onSubmit={handleSubmit(onSubmitForm)}>
          <div className=" mt-[20px] ">
            <div className="">
              <ControlledInput
                control={control}
                label="Code"
                name="code"
                type="text"
              />
            </div>
          </div>
          <div className=" mt-[20px] ">
            <div className="">
              <ControlledInput
                control={control}
                label="New Password"
                name="new_password"
                type={pshow ? 'text' : 'password'}
                useEndAdornment={
                  <InputRightElement>
                    <p
                      className="btn-icon cursor-pointer"
                      onClick={handleClickP}
                      role="openAndCloseEye"
                    >
                      {pshow ? (
                        <ViewIcon color="#072723" />
                      ) : (
                        <ViewOffIcon color="#072723" />
                      )}
                    </p>
                  </InputRightElement>
                }
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
    </div>
  );
}

export default ResetPassword;
