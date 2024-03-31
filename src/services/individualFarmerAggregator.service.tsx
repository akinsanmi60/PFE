import { useAuthContext } from '@contexts/authContext';
import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@utils/apiCaller';
import {
  GET_INDIVIDUAL_AGGREGATOR_URL,
  GET_INDIVIDUAL_FARMER_URL,
  GET_USER_PRODUCE_URL,
} from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { queryParamsHelper } from 'config/query-params';
import {
  IIndividualFarmer,
  IIndividualResponse,
  IIndividualUrlParams,
} from 'types/individualFarmerAggregator.type';
import { IBaseQueryProps } from 'types/pentrarHub.type';
import { IMyProduceResponse } from 'types/produce.type';

function useGetIndividualFarmer({ queryParamsId, url }: IIndividualUrlParams) {
  const { isLoading, isRefetching, isError, data } =
    useQuery<IIndividualResponse>(
      [queryKeys.getIndividualFarmer, queryParamsId],
      () => getRequest({ url: url(queryParamsId) }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data?.data as IIndividualFarmer,
  };
}

function useGetIndividualFarmerDependent() {
  const { authUser } = useAuthContext();

  const { isLoading, isRefetching, isError, data } =
    useQuery<IIndividualResponse>(
      [queryKeys.getIndividualFarmer],
      () =>
        getRequest({ url: GET_INDIVIDUAL_FARMER_URL(authUser?.id as string) }),
      {
        refetchOnWindowFocus: false,
        enabled: authUser?.role === 'farmer' && !!authUser?.id,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data?.data as IIndividualFarmer,
  };
}

//TODO: type this response for useQuery IndividualAggregator
function useGetIndividualAggregator({
  queryParamsId,
  url,
}: IIndividualUrlParams) {
  const { isLoading, isRefetching, isError, data } =
    useQuery<IIndividualResponse>(
      [queryKeys.getIndividualAggregator, queryParamsId],
      () => getRequest({ url: url(queryParamsId) }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data?.data as IIndividualFarmer,
  };
}

//TODO: type this response for useQuery IndividualAggregator
function useGetIndividualAggregatorDependent() {
  const { authUser } = useAuthContext();

  const { isLoading, isRefetching, isError, data } =
    useQuery<IIndividualResponse>(
      [queryKeys.getIndividualAggregator],
      () =>
        getRequest({
          url: GET_INDIVIDUAL_AGGREGATOR_URL(authUser?.id as string),
        }),
      {
        refetchOnWindowFocus: false,
        enabled: authUser?.role === 'aggregator' && !!authUser?.id,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data?.data as IIndividualFarmer,
  };
}

function useFarmerAggregatorProduce(
  queryParams: IBaseQueryProps,
  id: string,
  userType: string,
) {
  const { isLoading, isRefetching, isError, data } =
    useQuery<IMyProduceResponse>(
      [queryKeys.getIMyProduce, [queryParams]],
      () =>
        getRequest({
          url: `${GET_USER_PRODUCE_URL(
            id as string,
            userType as string,
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
export {
  useGetIndividualFarmer,
  useFarmerAggregatorProduce,
  useGetIndividualAggregator,
  useGetIndividualFarmerDependent,
  useGetIndividualAggregatorDependent,
};
