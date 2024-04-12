import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@utils/apiCaller';
import {
  GET_ALL_EXPORTER_URL,
  GET_EXPORTER_DASHBOARD_COUNT_URL,
  GET_INDIVIDUAL_EXPORTER_URL,
} from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { queryParamsHelper } from 'config/query-params';
import {
  IGetExportersResponse,
  IIndividualExporterDataResponse,
} from 'types/exporter.type';
import { IExporterDashBoardCount } from 'types/farmerAggregatorDash.type';
import { IBaseQueryProps } from 'types/pentrarHub.type';

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

const useGetAllExporters = (queryParams: IBaseQueryProps) => {
  const { isLoading, isRefetching, isError, data } =
    useQuery<IGetExportersResponse>(
      [queryKeys.getAllExporters, queryParams],
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
    data: data,
  };
};
const useGetIndividualExporter = ({
  queryParamsId,
}: {
  queryParamsId: string;
}) => {
  const { isLoading, isRefetching, isError, data, ...rest } =
    useQuery<IIndividualExporterDataResponse>(
      [queryKeys.getIndividualExporter, queryParamsId],
      () =>
        getRequest({
          url: GET_INDIVIDUAL_EXPORTER_URL(queryParamsId),
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    ...rest,
    isLoading,
    isRefetching,
    isError,
    data: data,
  };
};

export { GetDasboardOfExporter, useGetAllExporters, useGetIndividualExporter };
