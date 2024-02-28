import toastOptions from '@shared/Toast/Toast';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  IBaseResponse,
  IForgetProp,
  ILoginFormData,
  ILoginResponse,
  IPartialCreateUser,
  IRegister,
  IVerifyProp,
  IchangePasswordPayload,
} from 'types/auth.type';
import { useNavigate } from 'react-router-dom';
import handleApiError from '@utils/handleApiError';
import jwt_decode from 'jwt-decode';
import { IUserCTXType } from 'types/contextProvider.type';
import { saveDetailToLocalStorage, setToken } from '@hooks/localStorageHook';
import { useAuthContext } from '@contexts/authContext';
import { postRequest } from '@utils/apiCaller';
import {
  PARTIAL_USER_CREATION_URL,
  USER_CHANGE_PASSWORD_URL,
  USER_FORGET_URL,
  USER_SIGNUP_URL,
  USER_VERIFY_URL,
} from '@utils/apiUrl';
import { userPathsLinks } from '@modules/users/routes';
import { LOCAL_STORAGE_KEY } from '@utils/localStorageKey';

export const displayError = (error: any) => {
  const content = handleApiError(error);
  return toast.error(content, toastOptions);
};

const userDashboard = ['farmer', 'aggregator'];
const adminDashboard = ['admin', 'subAdmin'];

export const useLoginMutation = ({ url }: { url: string }) => {
  const { setAuthUser } = useAuthContext();

  const navigate = useNavigate();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: ILoginFormData }) =>
      postRequest<ILoginFormData, ILoginResponse>({
        url: url,
        payload,
      }),
    {
      onSuccess(res) {
        const accessToken = res?.data?.accessToken;
        if (accessToken) {
          const decodedUser = jwt_decode(
            accessToken,
          ) as unknown as IUserCTXType;
          setToken(accessToken);
          setAuthUser(decodedUser);
          if (
            decodedUser &&
            decodedUser.isEmail_verified &&
            userDashboard.includes(decodedUser.role)
          ) {
            toast.success(res?.message || '', toastOptions);
            saveDetailToLocalStorage(
              LOCAL_STORAGE_KEY.URL,
              `/${userPathsLinks.basePath}`,
            );
            navigate(`/${userPathsLinks.basePath}`, { replace: true });
          } else if (decodedUser && adminDashboard.includes(decodedUser.role)) {
            toast.success(res?.message || '', toastOptions);
            navigate('/sadmin/dashboard', { replace: true });
          }
        }
      },
      onError(error) {
        displayError(error);
      },
    },
  );
  return { mutate, isLoading, ...rest };
};

export const usePartialUserCreationMutation = ({
  action,
}: {
  action?: () => void;
}) => {
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IPartialCreateUser }) =>
      postRequest<IPartialCreateUser, IBaseResponse>({
        url: PARTIAL_USER_CREATION_URL,
        payload,
      }),
    {
      onSuccess(res) {
        toast.success(res?.message, toastOptions);
        if (action) {
          action();
        }
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};
export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IRegister }) =>
      postRequest<IRegister, IBaseResponse>({
        url: USER_SIGNUP_URL,
        payload,
      }),
    {
      onSuccess(res) {
        toast.success(res?.message, toastOptions);
        navigate('/login');
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

export const useForgetPasswordMutation = () => {
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IForgetProp }) =>
      postRequest<IForgetProp, IBaseResponse>({
        url: USER_FORGET_URL,
        payload,
      }),
    {
      onSuccess(res: IBaseResponse) {
        toast.success(res?.message, toastOptions);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

export const useChangePasswordMutation = () => {
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IchangePasswordPayload }) =>
      postRequest<IchangePasswordPayload, IBaseResponse>({
        url: USER_CHANGE_PASSWORD_URL,
        payload,
      }),
    {
      onSuccess(res) {
        toast.success(res?.message, toastOptions);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

export const useVerifyMutation = ({ action }: { action?: () => void }) => {
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IVerifyProp }) =>
      postRequest<IVerifyProp, IBaseResponse>({
        url: USER_VERIFY_URL,
        payload,
      }),
    {
      onSuccess(res) {
        toast.success(res?.message, toastOptions);
        if (action) {
          action();
        }
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};
