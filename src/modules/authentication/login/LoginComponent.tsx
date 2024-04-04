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
import { capitalize, getYear } from '@utils/constants';

const userType = ['farmer', 'aggregator', 'exporter', 'offtaker'];

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
    return `/register-form/${pageTitle}`;
  };

  return (
    <div
      className={`flex flex-col justify-between items-center h-screen py-[10px] xlsm:justify-start`}
      role="loginBox"
    >
      <form
        action=""
        role="loginForm"
        className="w-[490px] xlsm:w-full p-[24px] xlsm:px-0  text-[#1A1A1A]"
      >
        <div className="flex flex-col items-center gap-y-[50px]">
          <div>
            <img
              src={pentrarLogo}
              alt="logo"
              onClick={() => navigate(`${webPaths.home()}`)}
              className="cursor-pointer w-[180px] h-[70px]"
            />
          </div>

          <div>
            <h1 className="text-[24px] leading-[32px] tracking-normal text-center text-[#111827] font-[700]">
              Welcome Back
            </h1>
            <h1 className="text-[15px] leading-[32px] tracking-normal text-center text-[#111827] font-[500] mt-[8px]">
              Please enter your{' '}
              <span className="font-[700]">{capitalize(pageTitle)}</span>{' '}
              details to login
            </h1>
          </div>
        </div>
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

        {userType.includes(pageTitle) && (
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

      <p className="text-[15px] leading-[23px] tracking-normal font-[500] text-[#999999] xlsm:text-center">
        © {getYear()} Pentrar. All Rights reserved.{' '}
        <b className="text-[#1A1A1A]">Terms & Conditions and Privacy Policy</b>
      </p>
    </div>
  );
}

export default GeneralLoginPage;
