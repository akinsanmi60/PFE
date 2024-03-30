import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { InputRightElement } from '@chakra-ui/react';
import ControlledInput from '@shared/Input/ControlledInput';
import CustomButton from '@shared/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from 'validation/loginValidation';
import { useLoginMutation } from 'services/auth.service';
import { useNavigate } from 'react-router-dom';
import { ILoginFormData } from 'types/auth.type';
import pentrarLogo from '@assets/svg/LogoPentrar.svg';
import { webPaths } from '@utils/paths';
import { getYear } from '@utils/constants';

function GeneralLoginPage({
  url,
  pageTitle,
}: {
  url: string;
  pageTitle: string;
}) {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
    resolver: yupResolver(LoginSchema),
  });
  const [pshow, setPshow] = useState(false);
  const handleClickP = () => setPshow(!pshow);

  const navigate = useNavigate();

  const { mutate, isLoading } = useLoginMutation({ url: url });
  const onSubmitForm = (values: ILoginFormData) => {
    mutate({ payload: values });
  };

  const registerScreenLink = () => {
    switch (pageTitle) {
      case 'FarmerAggregator':
        return '/register-form';
      case 'offtakerExporter':
        return '/register/form';
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-between h-screen py-[10px]`}
      role="loginBox"
    >
      <>
        <img
          src={pentrarLogo}
          alt="logo"
          onClick={() => navigate(`${webPaths.home()}`)}
          className="cursor-pointer"
        />
      </>

      <form
        action=""
        role="loginForm"
        className="w-[490px] p-[24px]  text-[#1A1A1A]"
      >
        <h1 className="text-[24px] leading-[32px] tracking-normal text-center text-[#111827] font-[700]">
          Login to your account
        </h1>
        <div className=" mt-[20px] ">
          <div className="w-full">
            <ControlledInput
              control={control}
              label="Email"
              name="email"
              type="email"
            />
          </div>
          <div className="mt-[13px]">
            <ControlledInput
              control={control}
              name="password"
              label="Password"
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

        <div className="flex justify-end mt-[20px] text-[14px] font-[500] leading-[21px] text-[#666666]">
          <p
            onClick={() => navigate('/forgot-password')}
            className="cursor-pointer"
          >
            Forgot Password
          </p>
        </div>

        <div className="mt-[20px]">
          <CustomButton
            className="w-full text-primary-white"
            loading={isLoading}
            loadingText="Loading..."
            type="submit"
            disabled={!isValid}
            onClick={handleSubmit(onSubmitForm)}
            variant={!isValid || isLoading ? 'solid' : ''}
          >
            Login
          </CustomButton>
        </div>

        {(pageTitle === 'FarmerAggregator' ||
          pageTitle === 'offtakerExporter') && (
          <div className="flex justify-center items-center mt-[20px]">
            <div>
              <p className="text-[15px] leading-[23px] tracking-normal text-[#999999]">
                You’re new in here?{' '}
                <a href={registerScreenLink()} className="">
                  <b className="text-[#2AA232]">Request Acces</b>
                </a>{' '}
              </p>
            </div>
          </div>
        )}
      </form>

      <p className="text-[15px] leading-[23px] tracking-normal font-[500] text-[#999999]">
        © {getYear()} Pentrar. All Rights reserved.{' '}
        <strong className="text-[#1A1A1A]">
          Terms & Conditions and Privacy Policy
        </strong>
      </p>
    </div>
  );
}

export default GeneralLoginPage;
