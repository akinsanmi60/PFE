import { useAuthContext } from './../contexts/authContext';
import { useModalContext } from '@contexts/modalContext';
import { displaySuccess, displayError } from '@shared/Toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest } from '@utils/apiCaller';
import {
  ADD_PRODUCE_URL,
  GET_PRODUCE_BY_ID_URL,
  GET_USER_PRODUCE_URL,
} from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { queryParamsHelper } from 'config/query-params';
import { UseFormReset } from 'react-hook-form';
import { IBaseResponse } from 'types/auth.type';
import { IBaseQueryProps } from 'types/pentrarHub.type';
import {
  IAddProducePayload,
  IGetSingleProduce,
  IMyProduceData,
  IMyProduceResponse,
} from 'types/produce.type';

const useProduceCreationMutation = ({
  id,
  action,
  reset,
  setImageString,
}: {
  action?: () => void;
  id: string;
  reset: UseFormReset<Omit<IAddProducePayload, 'images'>>;
  setImageString: React.Dispatch<React.SetStateAction<File[] | null>>;
}) => {
  const queryClient = useQueryClient();
  const { handleModalClose } = useModalContext();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IAddProducePayload }) =>
      postRequest<IAddProducePayload, IBaseResponse>({
        url: ADD_PRODUCE_URL(id),
        payload,
      }),
    {
      onSuccess(res) {
        displaySuccess(res?.message);
        setImageString(null);
        reset();
        handleModalClose('addProduce');
        if (action) {
          action();
        }
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getIMyProduce],
        });
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

function useGetMyProduce(queryParams: IBaseQueryProps) {
  const { authUser } = useAuthContext();
  const { isLoading, isRefetching, isError, data } =
    useQuery<IMyProduceResponse>(
      [queryKeys.getIMyProduce, [queryParams]],
      () =>
        getRequest({
          url: `${GET_USER_PRODUCE_URL(
            authUser?.id as string,
            authUser?.role as string,
          )}${queryParamsHelper(queryParams)}`,
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data as IMyProduceResponse,
  };
}
function useGetSingleProduce(id: string) {
  const { isLoading, isRefetching, isError, data } =
    useQuery<IGetSingleProduce>(
      [queryKeys.getSingleProduce],
      () =>
        getRequest({
          url: `${GET_PRODUCE_BY_ID_URL(id)}`,
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data?.data as IMyProduceData,
  };
}

export { useProduceCreationMutation, useGetMyProduce, useGetSingleProduce };
