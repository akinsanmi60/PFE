import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@utils/apiCaller';
import { queryKeys } from '@utils/queryKey';
import {
  IDashboardRecentProduce,
  IFarmerAggregatorDashboardcount,
} from 'types/farmerAggregatorDash.type';

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

function useGetRecentProduce({
  queryParamsId,
  url,
}: {
  queryParamsId: string;
  url: (_id: string) => string;
}) {
  const { isLoading, isRefetching, isError, data } =
    useQuery<IDashboardRecentProduce>(
      [queryKeys.getFarmerAggregatorRecentProduce, queryParamsId],
      () => getRequest({ url: url(queryParamsId) }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data as IDashboardRecentProduce,
  };
}

export { GetDasboardOfFarmerAggregator, useGetRecentProduce };
