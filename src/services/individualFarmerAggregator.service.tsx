import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@utils/apiCaller';
import { queryKeys } from '@utils/queryKey';
import {
  IIndividualFarmer,
  IIndividualResponse,
  IIndividualUrlParams,
} from 'types/individualFarmerAggregator.type';

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

export { useGetIndividualFarmer };
