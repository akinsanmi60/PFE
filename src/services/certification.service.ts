import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@utils/apiCaller';
import { GET_ALL_CERTIFICATIONS_URL } from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { queryParamsHelper } from 'config/query-params';
import {
  ICertificationData,
  ICertificationRes,
} from 'types/certification.type';
import { IBaseQueryProps } from 'types/pentrarHub.type';

const useGetAllCertification = (queryParams: IBaseQueryProps) => {
  const { isLoading, isRefetching, data, ...rest } =
    useQuery<ICertificationRes>(
      [queryKeys.getAllCertificate, queryParams],
      () =>
        getRequest({
          url: `${GET_ALL_CERTIFICATIONS_URL}${queryParamsHelper(queryParams)}`,
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    ...rest,
    data: data?.data as ICertificationData,
  };
};

export { useGetAllCertification };
