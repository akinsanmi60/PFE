import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@utils/apiCaller';
import { GET_PENTRAHUB_PRODUCE_URL } from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { queryParamsHelper } from 'config/query-params';
import {
  IGetPentrarHubData,
  IPentrarHubResponse,
  IQueryHubProp,
} from 'types/pentrarHub.type';

function useGetPentrarHubProduce(queryParams: IQueryHubProp) {
  const { isLoading, isRefetching, isError, data } =
    useQuery<IPentrarHubResponse>(
      [queryKeys.getPentrarHubProduce, queryParams],
      () =>
        getRequest({
          url: `${GET_PENTRAHUB_PRODUCE_URL()}${queryParamsHelper(
            queryParams,
          )}`,
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data?.data as IGetPentrarHubData,
  };
}

export { useGetPentrarHubProduce };
