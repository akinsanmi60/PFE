/* eslint-disable no-unused-vars */
import { useMutation } from '@tanstack/react-query';
import { postRequest } from '@utils/apiCaller';
import { displayError } from './auth.service';
import {
  ICompleteFormData,
  IStartFormData,
  IStartResponse,
} from 'types/personalSetting.type';

export const useStartPhoneVerification = (props: any) => {
  const { switchView, id } = props;
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IStartFormData }) =>
      postRequest<IStartFormData, IStartResponse>({
        url: `/auth/startPhoneVerification/${id}`,
        payload,
      }),
    {
      onSuccess(_res) {
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
export const useCompletePhoneVerification = (props: any) => {
  const { id } = props;
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: ICompleteFormData }) =>
      postRequest<ICompleteFormData, IStartResponse>({
        url: `/auth/startPhoneVerification/${id}`,
        payload,
      }),
    {
      onSuccess(_res) {},
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};
