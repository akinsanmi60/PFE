import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@utils/apiCaller';
import {
  GET_ALL_EXPORTER_URL,
  GET_EXPORTER_DASHBOARD_COUNT_URL,
} from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { queryParamsHelper } from 'config/query-params';
import { IFarmerQueryProp } from 'types/admin.type';
import { IExporterDashBoardCount } from 'types/farmerAggregatorDash.type';

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

const useGetAllExporters = (queryParams: IFarmerQueryProp) => {
  const { isLoading, isRefetching, isError, data } = useQuery<any>(
    [queryKeys.getAllFarmers, queryParams],
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
    data: data as any,
  };
};

export { GetDasboardOfExporter, useGetAllExporters };
