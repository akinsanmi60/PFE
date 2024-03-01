import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@utils/apiCaller';
import { queryKeys } from '@utils/queryKey';
import { IFarmerAggregatorDashboardcount } from 'types/farmerAggregatorDash.type';

function GetDasboardOfFarmerAggregator({
  queryParamsId,
  url,
}: {
  queryParamsId: string;
  url: (_id: string) => string;
}) {
  const { isLoading, isRefetching, isError, data } =
    useQuery<IFarmerAggregatorDashboardcount>(
      [queryKeys.getFarmerAggregatorDashboardCount, queryParamsId],
      () => getRequest({ url: url(queryParamsId) }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data as IFarmerAggregatorDashboardcount,
  };
}

export default GetDasboardOfFarmerAggregator;
