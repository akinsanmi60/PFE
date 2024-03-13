import { useMutation, useQuery } from '@tanstack/react-query';
import {
  IBaseResponse,
  IForgetProp,
  ILoginFormData,
  ILoginResponse,
  IPartialCreateUser,
  IRegister,
  IResetProp,
  IVerifyProp,
  IchangePasswordPayload,
} from 'types/auth.type';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { IUserCTXType } from 'types/contextProvider.type';
import { saveDetailToLocalStorage, setToken } from '@hooks/localStorageHook';
import { useAuthContext } from '@contexts/authContext';
import { getRequest, postRequest } from '@utils/apiCaller';
import {
  CHECK_EMAIL_URL,
  PARTIAL_USER_CREATION_URL,
  USER_CHANGE_PASSWORD_URL,
  USER_FORGET_URL,
  USER_RESET_URL,
  USER_SIGNUP_URL,
  USER_VERIFY_URL,
} from '@utils/apiUrl';
import { userPathsLinks } from '@modules/users/routes';
import { LOCAL_STORAGE_KEY } from '@utils/localStorageKey';
import { RootLink } from 'routes/routeObject';
import { displayError, displaySuccess } from '@shared/Toast/Toast';
import { adminPathsLinks } from '@modules/admin/routes';
import { queryKeys } from '@utils/queryKey';
// import { queryParamsHelper } from 'config/query-params';

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
            displaySuccess(res?.message || '');
            saveDetailToLocalStorage(
              LOCAL_STORAGE_KEY.URL,
              `/${userPathsLinks.basePath}`,
            );
            navigate(
              `/${userPathsLinks.basePath}/${userPathsLinks.dashBoard}`,
              { replace: true },
            );
          } else if (decodedUser && adminDashboard.includes(decodedUser.role)) {
            displaySuccess(res?.message || '');
            saveDetailToLocalStorage(
              LOCAL_STORAGE_KEY.URL,
              `/${adminPathsLinks.basePath}/${adminPathsLinks.dashBoard}`,
            );
            navigate(
              `/${adminPathsLinks.basePath}/${adminPathsLinks.dashBoard}`,
              { replace: true },
            );
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
        displaySuccess(res?.message);
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
        displaySuccess(res?.message);
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
  const navigate = useNavigate();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IForgetProp }) =>
      postRequest<IForgetProp, IBaseResponse>({
        url: USER_FORGET_URL,
        payload,
      }),
    {
      onSuccess(res: IBaseResponse) {
        displaySuccess(res?.message);
        navigate(RootLink.forgotPassword);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IResetProp }) =>
      postRequest<IResetProp, IBaseResponse>({
        url: USER_RESET_URL,
        payload,
      }),

    {
      onSuccess(res: IBaseResponse) {
        displaySuccess(res?.message);
        navigate(RootLink.login);
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
        displaySuccess(res?.message);
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
    ({ payload }: { payload: Partial<IVerifyProp> }) =>
      postRequest<Partial<IVerifyProp>, IBaseResponse>({
        url: USER_VERIFY_URL,
        payload,
      }),
    {
      onSuccess(res) {
        displaySuccess(res?.message);
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

export const useEmailCheck = (queryParams: string) => {
  const { isLoading, isRefetching, isError, data, isFetching } = useQuery<any>(
    [queryKeys.emailCheck, [queryParams]],
    () =>
      getRequest({
        url: `${CHECK_EMAIL_URL}?email=${encodeURIComponent(queryParams)}`,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!queryParams,
    },
  );

  return {
    isLoading,
    isRefetching,
    isError,
    isFetching,
    data: data as any,
  };
};
