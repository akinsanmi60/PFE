import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@utils/apiCaller';
import { GET_EXPORTER_DASHBOARD_COUNT_URL } from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
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

export { GetDasboardOfExporter };
