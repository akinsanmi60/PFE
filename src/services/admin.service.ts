import { displaySuccess, displayError } from '@shared/Toast/Toast';
import { useMutation } from '@tanstack/react-query';
import { postRequest } from '@utils/apiCaller';
import { ADD_ADMIN_URL } from '@utils/apiUrl';
import { IBaseResponse } from 'types/auth.type';
import { IAddSubAdminPayload } from 'types/subAdmin.type';

export const useAdminCreationMutation = () => {
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IAddSubAdminPayload }) =>
      postRequest<IAddSubAdminPayload, IBaseResponse>({
        url: ADD_ADMIN_URL,
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
