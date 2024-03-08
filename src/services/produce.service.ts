import { displaySuccess, displayError } from '@shared/Toast/Toast';
import { useMutation } from '@tanstack/react-query';
import { postRequest } from '@utils/apiCaller';
import { ADD_PRODUCE_URL } from '@utils/apiUrl';
import { IBaseResponse } from 'types/auth.type';
import { IAddProducePayload } from 'types/produce.type';

export const useProduceCreationMutation = ({
  id,
  action,
}: {
  action?: () => void;
  id: string;
}) => {
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IAddProducePayload }) =>
      postRequest<IAddProducePayload, IBaseResponse>({
        url: ADD_PRODUCE_URL(id),
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
