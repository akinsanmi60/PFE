import { useForm } from 'react-hook-form';
import { changePasswordSchema } from 'validation/changePasswordValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import ControlledInput from '@shared/Input/ControlledInput';
import CustomButton from '@shared/Button';
import { useChangePasswordMutation } from 'services/auth.service';
import { useState } from 'react';
import { InputRightElement } from '@chakra-ui/react'; // Assuming you are using Chakra UI for icons
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'; // Assuming you are using Chakra UI for icons
import PageTile from 'components/pageTile';
import { IChangePassword } from 'types/auth.type';
import {
  USER_CHANGE_PASSWORD_URL,
  AGENCY_UPDATE_PASSWORD_URL,
  ADMIN_UPDATE_PASSWORD_URL,
} from '@utils/apiUrl';
import { useAuthContext } from '@contexts/authContext';

type IStateObject = {
  oldPasswordView: boolean;
  newPasswordView: boolean;
  confirmPasswordView: boolean;
};

type InputNames = 'old_password' | 'new_password' | 'confirm_password';
const agencyRoles = ['agency', 'agencyAdmin', 'agencySubAdmin'];
const adminRoles = ['admin', 'subAdmin'];

function ChangePassword({ useTitle = true }: { useTitle?: boolean }) {
  const { authUser } = useAuthContext();

  const urlSwitch = agencyRoles.includes(authUser?.role as string)
    ? AGENCY_UPDATE_PASSWORD_URL(authUser?.id as string)
    : adminRoles.includes(authUser?.role as string)
    ? ADMIN_UPDATE_PASSWORD_URL(authUser?.id as string)
    : USER_CHANGE_PASSWORD_URL(authUser?.id as string);

  const [passwordViews, setPasswordViews] = useState<IStateObject>({
    oldPasswordView: false,
    newPasswordView: false,
    confirmPasswordView: false,
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '', // Include confirm_password in defaultValues
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const { isLoading, mutate } = useChangePasswordMutation({
    url: urlSwitch,
    reset,
  });

  const handleClickPasswordVisibility = (passwordKey: keyof IStateObject) => {
    setPasswordViews(prev => ({
      ...prev,
      [passwordKey]: !prev[passwordKey],
    }));
  };

  const onSubmit = (values: IChangePassword) => {
    const payload = {
      current_password: values.old_password,
      new_password: values.new_password,
    };
    mutate({ payload: payload });
  };

  const inputObject = [
    {
      label: 'Old Password',
      inputName: 'old_password',
      viewName: 'oldPasswordView',
      stateView: passwordViews.oldPasswordView,
    },
    {
      label: 'New Password',
      inputName: 'new_password',
      viewName: 'newPasswordView',
      stateView: passwordViews.newPasswordView,
    },
    {
      label: 'Confirm Password',
      inputName: 'confirm_password',
      viewName: 'confirmPasswordView',
      stateView: passwordViews.confirmPasswordView,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${useTitle ? 'p-[24px]' : ''}`}
    >
      {useTitle && <PageTile title="Change Password" />}
      <div
        className={`flex flex-col gap-[12px] ${useTitle ? 'mt-[30px]' : ''}`}
      >
        {inputObject.map(item => (
          <div key={item.inputName}>
            <ControlledInput
              control={control}
              label={item.label}
              name={item.inputName as InputNames}
              type={item.stateView ? 'text' : 'password'}
              useEndAdornment={
                <InputRightElement>
                  <p
                    className="btn-icon cursor-pointer"
                    onClick={() =>
                      handleClickPasswordVisibility(
                        item.viewName as keyof IStateObject,
                      )
                    }
                    role="openAndCloseEye"
                  >
                    {item?.stateView ? (
                      <ViewIcon color="#072723" />
                    ) : (
                      <ViewOffIcon color="#072723" />
                    )}
                  </p>
                </InputRightElement>
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-[30px] flex justify-end">
        <div>
          <CustomButton
            className="w-full btn-primary-min"
            loadingText="Loading..."
            loading={isLoading}
            type="submit"
          >
            Save Changes
          </CustomButton>
        </div>
      </div>
    </form>
  );
}

export default ChangePassword;
