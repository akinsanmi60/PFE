import { useFormData } from '@contexts/formContext';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@shared/Button';
import ControlledCheckbox from '@shared/Checkbox';
import ControlledInput from '@shared/Input/ControlledInput';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from 'services/auth.service';
import { IFormComponentType, IRegister } from 'types/auth.type';
import { createPasswordSchema } from 'validation/registerValidation';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';

type IStateObject = {
  passwordView: boolean;
  confirmPasswordView: boolean;
};

function CreatePassword({ previous, currentStep }: IFormComponentType) {
  const { multiFormValues } = useFormData();
  const { mutate, isLoading } = useRegisterMutation();
  const [passwordViews, setPasswordViews] = useState<IStateObject>({
    passwordView: false,
    confirmPasswordView: false,
  });

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
      confirm_password: '',
      terms_condition: '',
    },
    resolver: yupResolver(createPasswordSchema),
  });

  const handleClickPasswordVisibility = (passwordKey: keyof IStateObject) => {
    setPasswordViews(prev => ({
      ...prev,
      [passwordKey]: !prev[passwordKey],
    }));
  };

  const onSubmit = (values: Partial<IRegister>) => {
    const payload = {
      ...multiFormValues,
      password: values.password,
      terms_condition: values.terms_condition !== '' && true,
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
              type={passwordViews.passwordView ? 'text' : 'password'}
              useEndAdornment={
                <InputRightElement>
                  <p
                    className="btn-icon cursor-pointer"
                    onClick={() =>
                      handleClickPasswordVisibility('passwordView')
                    }
                    role="openAndCloseEye"
                  >
                    {passwordViews.passwordView ? (
                      <ViewIcon color="#072723" />
                    ) : (
                      <ViewOffIcon color="#072723" />
                    )}
                  </p>
                </InputRightElement>
              }
            />
          </div>
          <div className="">
            <ControlledInput
              control={control}
              name="confirm_password"
              label="Re-enter Password"
              type={passwordViews.confirmPasswordView ? 'text' : 'password'}
              useEndAdornment={
                <InputRightElement>
                  <p
                    className="btn-icon cursor-pointer"
                    onClick={() =>
                      handleClickPasswordVisibility('confirmPasswordView')
                    }
                    role="openAndCloseEye"
                  >
                    {passwordViews.confirmPasswordView ? (
                      <ViewIcon color="#072723" />
                    ) : (
                      <ViewOffIcon color="#072723" />
                    )}
                  </p>
                </InputRightElement>
              }
            />
          </div>
          <div>
            <ControlledCheckbox
              control={control}
              name="terms_condition"
              label={`I have read and agree to Pentrar's Terms and Conditions
              `}
              checkboxValue="terms_condition"
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
              disabled={!isValid || !isDirty}
              variant={!isValid || !isDirty || isLoading ? 'solid' : ''}
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
