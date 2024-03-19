import { displaySuccess, displayError } from '@shared/Toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest } from '@utils/apiCaller';
import {
  ADD_ADMIN_URL,
  APPROVE_AGGREGATOR_URL,
  APPROVE_FARMER_URL,
  GET_ADMIN_DASHBOARD_COUNT_URL,
  GET_ALL_ADMIN_OFFICERS,
  GET_ALL_AGGREGATOR_URL,
  GET_ALL_FARMER_URL,
  GET_ALL_PRODUCE_URL,
} from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { IBaseResponse } from 'types/auth.type';
import { IAddSubAdminPayload } from 'types/subAdmin.type';
import { queryParamsHelper } from 'config/query-params';
import {
  IAdminDataResponse,
  IDataRes,
  IFarmerQueryProp,
  ISubAdminQuery,
} from 'types/admin.type';

const useAdminCreationMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: IAddSubAdminPayload }) =>
      postRequest<IAddSubAdminPayload, IBaseResponse>({
        url: ADD_ADMIN_URL,
        payload,
      }),

    {
      onSuccess(res) {
        displaySuccess(res?.message);
        queryClient.invalidateQueries([queryKeys.getAllSubAdmin]);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

const useApproveFarmer = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    () =>
      postRequest<any, IBaseResponse>({
        url: APPROVE_FARMER_URL(id),
      }),

    {
      onSuccess(res) {
        queryClient.invalidateQueries([queryKeys.getIndividualFarmer]);
        displaySuccess(res?.message);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};
const useApproveAggregator = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    () =>
      postRequest<any, IBaseResponse>({
        url: APPROVE_AGGREGATOR_URL(id),
      }),

    {
      onSuccess(res) {
        queryClient.invalidateQueries([queryKeys.getIndividualAggregator]);
        displaySuccess(res?.message);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

//TODO: type response for useQuery AllFarmers
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

//TODO: type response for useQuery AllAggregators
const useGetAllAggregators = (queryParams: IFarmerQueryProp) => {
  const { isLoading, isRefetching, isError, data } = useQuery<any>(
    [queryKeys.getAllAggregator, queryParams],
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

//TODO: type response for useQuery AllProduce
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

//TODO: type response for useQuery AdminDashboard
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

const useGetAllSubAdmin = (queryParams: ISubAdminQuery) => {
  const { data, isLoading, isRefetching, isError } =
    useQuery<IAdminDataResponse>(
      [queryKeys.getAllSubAdmin, queryParams],
      () =>
        getRequest({
          url: `${GET_ALL_ADMIN_OFFICERS}${queryParamsHelper(queryParams)}`,
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data?.data as IDataRes,
  };
};

export {
  useAdminCreationMutation,
  useGetAllFarmers,
  useGetAllAggregators,
  useGetAllProduce,
  useGetAdminDashboard,
  useGetAllSubAdmin,
  useApproveFarmer,
  useApproveAggregator,
};
