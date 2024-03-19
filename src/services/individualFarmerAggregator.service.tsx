import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@utils/apiCaller';
import { GET_USER_PRODUCE_URL } from '@utils/apiUrl';
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
};
