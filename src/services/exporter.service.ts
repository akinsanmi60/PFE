import { useAuthContext } from '@contexts/authContext';
import { useModalContext } from '@contexts/modalContext';
import { displayError, displaySuccess } from '@shared/Toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest } from '@utils/apiCaller';
import {
  GET_ALL_EXPORTER_URL,
  GET_EXPORTER_DASHBOARD_COUNT_URL,
  GET_INDIVIDUAL_EXPORTER_URL,
  SUBMIT_CERTIFICATION_URL,
} from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { queryParamsHelper } from 'config/query-params';
import { UseFormReset } from 'react-hook-form';
import { IBaseResponse } from 'types/auth.type';
import {
  IGetExportersResponse,
  IIndividualExporterDataResponse,
} from 'types/exporter.type';
import { IExporterDashBoardCount } from 'types/farmerAggregatorDash.type';
import { IBaseQueryProps } from 'types/pentrarHub.type';
import {
  ISubmitCertificationFieldValues,
  ISubmitCertificationPayload,
  toSendId,
} from 'types/produce.type';

function GetDasboardOfExporter({ queryParamsId }: { queryParamsId: string }) {
  const { isLoading, isRefetching, isError, data } =
    useQuery<IExporterDashBoardCount>(
      [queryKeys.getExporterDashboardCount, queryParamsId],
      () =>
        getRequest({ url: GET_EXPORTER_DASHBOARD_COUNT_URL(queryParamsId) }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data,
  };
}

const useGetAllExporters = (queryParams: IBaseQueryProps) => {
  const { isLoading, isRefetching, isError, data } =
    useQuery<IGetExportersResponse>(
      [queryKeys.getAllExporters, queryParams],
      () =>
        getRequest({
          url: `${GET_ALL_EXPORTER_URL}${queryParamsHelper(queryParams)}`,
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data,
  };
};
const useGetIndividualExporter = (queryParamsId: string) => {
  const { isLoading, isRefetching, isError, data, ...rest } =
    useQuery<IIndividualExporterDataResponse>(
      [queryKeys.getIndividualExporter],
      () =>
        getRequest({
          url: GET_INDIVIDUAL_EXPORTER_URL(queryParamsId),
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    ...rest,
    isLoading,
    isRefetching,
    isError,
    data: data,
  };
};

function useGetIndividualExporterDependent() {
  const { authUser } = useAuthContext();

  const { isLoading, isRefetching, isError, data } =
    useQuery<IIndividualExporterDataResponse>(
      [queryKeys.getIndividualAggregator],
      () =>
        getRequest({
          url: GET_INDIVIDUAL_EXPORTER_URL(authUser?.id as string),
        }),
      {
        refetchOnWindowFocus: false,
        enabled: authUser?.role === 'exporter' && !!authUser?.id,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data?.data,
  };
}

function useSubmitCertification({
  resetForm,
}: {
  resetForm: UseFormReset<ISubmitCertificationFieldValues>;
}) {
  const queryClient = useQueryClient();
  const { handleModalClose } = useModalContext();

  const { mutate, isLoading, ...rest } = useMutation({
    mutationFn: ({
      payload,
      idData,
    }: {
      payload: ISubmitCertificationPayload;
      idData: toSendId;
    }) =>
      postRequest<ISubmitCertificationPayload, IBaseResponse>({
        url: SUBMIT_CERTIFICATION_URL(
          idData.agencyID,
          idData.produceID,
          idData.exporterID,
        ),
        payload,
      }),
    onSuccess: res => {
      resetForm();
      displaySuccess(res?.message);
      handleModalClose('submitCertification');
      queryClient.invalidateQueries([queryKeys.getSingleProduce]);
    },
    onError(error) {
      displayError(error);
    },
  });

  return {
    mutate,
    isLoading,
    ...rest,
  };
}

export {
  GetDasboardOfExporter,
  useGetAllExporters,
  useGetIndividualExporter,
  useGetIndividualExporterDependent,
  useSubmitCertification,
};
