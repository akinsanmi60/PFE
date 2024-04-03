import { useAuthContext } from './../contexts/authContext';
import { useModalContext } from '@contexts/modalContext';
import { displaySuccess, displayError } from '@shared/Toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '@utils/apiCaller';
import {
  ACCEPT_TRANSFERED_PRODUCE,
  ADD_PRODUCE_URL,
  APPROVE_PRODUCE,
  DELETE_PRODUCE_URL,
  EDIT_PRODUCE_URL,
  GET_PRODUCE_BY_ID_URL,
  GET_USER_PRODUCE_URL,
  REJECT_TRANSFERED_PRODUCE,
  TRANSFER_PRODUCE_URL,
  TRANSFER_PROODUCE,
} from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { queryParamsHelper } from 'config/query-params';
import { UseFormReset } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IBaseResponse } from 'types/auth.type';
import { IBaseQueryProps } from 'types/pentrarHub.type';
import {
  DataTransferedObject,
  IAddProducePayload,
  IApproveProducePayload,
  IGEtAllTransferedProduce,
  IGetSingleProduce,
  IMyProduceData,
  IMyProduceResponse,
  ITransferProducePayload,
  ITransferProp,
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

const useProduceUpdateMutation = ({
  id,
  reset,
  setImageString,
}: {
  id: string;
  reset: UseFormReset<Omit<IAddProducePayload, 'images'>>;
  setImageString: React.Dispatch<React.SetStateAction<File[] | null>>;
}) => {
  const queryClient = useQueryClient();
  const { authUser } = useAuthContext();
  const { handleModalClose } = useModalContext();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IAddProducePayload }) =>
      putRequest<IAddProducePayload, IBaseResponse>({
        url: EDIT_PRODUCE_URL(
          id,
          authUser?.id as string,
          authUser?.role as string,
        ),
        payload,
      }),
    {
      onSuccess(res) {
        displaySuccess(res?.message);
        setImageString(null);
        handleModalClose('editProduce');
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getSingleProduce],
        });
        reset();
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};
const useProduceDeleteMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ id }: { id: string }) =>
      deleteRequest<IBaseResponse>({
        url: DELETE_PRODUCE_URL(id),
      }),
    {
      onSuccess(res) {
        displaySuccess(res?.message);
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getIMyProduce],
        });
        navigate('/pentrar/user/my-produces');
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

function useTransferProduce({
  resetForm,
}: {
  resetForm: UseFormReset<ITransferProducePayload>;
}) {
  const queryClient = useQueryClient();
  const { handleModalClose } = useModalContext();
  const { authUser } = useAuthContext();

  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload, id }: { payload: ITransferProducePayload; id: string }) =>
      postRequest<ITransferProducePayload, IBaseResponse>({
        url: TRANSFER_PRODUCE_URL(id, authUser?.id as string),
        payload,
      }),
    {
      onSuccess(res) {
        if (resetForm) {
          resetForm();
        }
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getSingleProduce],
        });
        if (handleModalClose) {
          handleModalClose('MoveTo');
        }
        displaySuccess(res?.message);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
}

function useApproveProduce({
  produceId,
  resetForm,
  userId,
}: {
  produceId: string;
  resetForm: UseFormReset<IApproveProducePayload>;
  userId: string;
}) {
  const queryClient = useQueryClient();
  const { handleModalClose } = useModalContext();

  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IApproveProducePayload }) =>
      postRequest<IApproveProducePayload, IBaseResponse>({
        url: APPROVE_PRODUCE(produceId, userId),
        payload,
      }),
    {
      onSuccess(res) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getSingleProduce],
        });
        displaySuccess(res?.message);
        if (resetForm) {
          resetForm();
        }
        if (handleModalClose) {
          handleModalClose('approveProduce');
        }
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
}

const useGetTransferProduces = (queryParams: ITransferProp) => {
  const { data, ...rest } = useQuery<IGEtAllTransferedProduce>(
    [queryKeys.getAllTransferProduces, [queryParams]],
    () =>
      getRequest({
        url: `${TRANSFER_PROODUCE}${queryParamsHelper(queryParams)}`,
      }),

    {
      refetchOnWindowFocus: false,
    },
  );
  return {
    ...rest,
    data: data?.data as DataTransferedObject,
  };
};

const useAcceptTransferProduce = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const { handleModalClose } = useModalContext();
  const { mutate, ...rest } = useMutation(
    ({ payload }: { payload: { id: string; userId: string } }) =>
      postRequest<{ id: string; userId: string }, IBaseResponse>({
        url: ACCEPT_TRANSFERED_PRODUCE(payload?.id, payload?.userId),
      }),
    {
      onSuccess: res => {
        setOpen(false);
        displaySuccess(res?.message);
        handleModalClose('toTransferDetailProduce');
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getAllTransferProduces],
        });
      },
      onError(error) {
        displayError(error);
      },
    },
  );
  return { mutate, ...rest };
};

const useRejectTransferProduce = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const { handleModalClose } = useModalContext();
  const { mutate, ...rest } = useMutation(
    ({ payload }: { payload: { id: string; userId: string } }) =>
      postRequest<{ id: string; userId: string }, IBaseResponse>({
        url: REJECT_TRANSFERED_PRODUCE(payload?.id, payload?.userId),
      }),
    {
      onSuccess: res => {
        setOpen(false);
        displaySuccess(res?.message);
        handleModalClose('toTransferDetailProduce');
        queryClient.invalidateQueries({
          queryKey: [queryKeys.getAllTransferProduces],
        });
      },
      onError(error) {
        displayError(error);
      },
    },
  );
  return { mutate, ...rest };
};

export {
  useProduceCreationMutation,
  useGetMyProduce,
  useGetSingleProduce,
  useTransferProduce,
  useApproveProduce,
  useProduceUpdateMutation,
  useProduceDeleteMutation,
  useGetTransferProduces,
  useAcceptTransferProduce,
  useRejectTransferProduce,
};
