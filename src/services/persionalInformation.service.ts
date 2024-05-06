import { displayError, displaySuccess } from '@shared/Toast/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchRequest } from '@utils/apiCaller';
import {
  ICompleteChangeEmailFormData,
  ICompleteFormData,
  IStartEmailFormData,
  IStartFormData,
  IStartResponse,
  IUseCompleteEmailVerification,
  IUseCompletePhoneVerification,
} from 'types/personalSetting.type';

export const useStartPhoneVerification = (props: any) => {
  const { switchView, url } = props;
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IStartFormData }) =>
      patchRequest<IStartFormData, IStartResponse>({
        url: url,
        payload,
      }),
    {
      onSuccess(res) {
        displaySuccess(res?.message);
        if (switchView) {
          switchView(2);
        }
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};
export const useCompletePhoneVerification = ({
  url,
  closeModal,
  queryText,
}: IUseCompletePhoneVerification) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: ICompleteFormData }) =>
      patchRequest<ICompleteFormData, IStartResponse>({
        url: url,
        payload,
      }),
    {
      onSuccess(res) {
        displaySuccess(res?.message);
        if (closeModal) {
          closeModal('phone');
        }
        queryClient.invalidateQueries([queryText]);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

export const useStartEmailVerification = (props: any) => {
  const { switchView, url } = props;
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IStartEmailFormData }) =>
      patchRequest<IStartEmailFormData, IStartResponse>({
        url: url,
        payload,
      }),
    {
      onSuccess(res) {
        displaySuccess(res?.message);
        if (switchView) {
          switchView(2);
        }
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

export const useCompleteEmailVerification = ({
  url,
  closeModal,
  queryText,
}: IUseCompleteEmailVerification) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: ICompleteChangeEmailFormData }) =>
      patchRequest<ICompleteChangeEmailFormData, IStartResponse>({
        url: url,
        payload,
      }),
    {
      onSuccess(res) {
        displaySuccess(res?.message);
        if (closeModal) {
          closeModal('email');
        }
        queryClient.invalidateQueries([queryText]);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};
