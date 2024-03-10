import { displaySuccess, displayError } from '@shared/Toast/Toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRequest, postRequest } from '@utils/apiCaller';
import {
  ADD_ADMIN_URL,
  GET_ADMIN_DASHBOARD_COUNT_URL,
  GET_ALL_AGGREGATOR_URL,
  GET_ALL_FARMER_URL,
  GET_ALL_PRODUCE_URL,
} from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { IBaseResponse } from 'types/auth.type';
import { IAddSubAdminPayload } from 'types/subAdmin.type';
import { queryParamsHelper } from 'config/query-params';
import { IFarmerQueryProp } from 'types/admin.type';

const useAdminCreationMutation = () => {
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

const useGetAllFarmers = (queryParams: IFarmerQueryProp) => {
  const { isLoading, isRefetching, isError, data } = useQuery<any>(
    [queryKeys.getAllFarmers, queryParams],
    () =>
      getRequest({
        url: `${GET_ALL_FARMER_URL()}${queryParamsHelper(queryParams)}`,
      }),
    {
      refetchOnWindowFocus: false,
    },
  );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data as any,
  };
};

const useGetAllAggregators = (queryParams: IFarmerQueryProp) => {
  const { isLoading, isRefetching, isError, data } = useQuery<any>(
    [queryKeys.getAllFarmers, queryParams],
    () =>
      getRequest({
        url: `${GET_ALL_AGGREGATOR_URL()}${queryParamsHelper(queryParams)}`,
      }),
    {
      refetchOnWindowFocus: false,
    },
  );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data as any,
  };
};

const useGetAllProduce = (queryParams: IFarmerQueryProp) => {
  const { isLoading, isRefetching, isError, data } = useQuery<any>(
    [queryKeys.getAllProduce, queryParams],
    () =>
      getRequest({
        url: `${GET_ALL_PRODUCE_URL()}${queryParamsHelper(queryParams)}`,
      }),
    {
      refetchOnWindowFocus: false,
    },
  );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data as any,
  };
};
const useGetAdminDashboard = (id: string) => {
  const { isLoading, isRefetching, isError, data } = useQuery<any>(
    [queryKeys.getAdminDashboardCount],
    () =>
      getRequest({
        url: GET_ADMIN_DASHBOARD_COUNT_URL(id),
      }),
    {
      refetchOnWindowFocus: false,
    },
  );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data as any,
  };
};

export {
  useAdminCreationMutation,
  useGetAllFarmers,
  useGetAllAggregators,
  useGetAllProduce,
  useGetAdminDashboard,
};
