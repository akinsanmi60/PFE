import { useModalContext } from '@contexts/modalContext';
import { displaySuccess, displayError } from '@shared/Toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest } from '@utils/apiCaller';
import { ADD_AGENCY_URL, GET_ALL_AGENCY_URL } from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { queryParamsHelper } from 'config/query-params';
import { IAgencyQuery, ICreateAgency } from 'types/admin.type';
import { IAgencyDataResponse, IAgencyDataRes } from 'types/agency.type';
import { IBaseResponse } from 'types/auth.type';

const useGetAllAgency = (queryParams: IAgencyQuery) => {
  const { data, isLoading, isRefetching, isError } =
    useQuery<IAgencyDataResponse>(
      [queryKeys.getAllAgencies, queryParams],
      () =>
        getRequest({
          url: `${GET_ALL_AGENCY_URL}${queryParamsHelper(queryParams)}`,
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data?.data as IAgencyDataRes,
  };
};

const useAgencyCreationMutation = () => {
  const { handleModalClose } = useModalContext();

  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload }: { payload: ICreateAgency }) =>
      postRequest<ICreateAgency, IBaseResponse>({
        url: ADD_AGENCY_URL,
        payload,
      }),

    {
      onSuccess(res) {
        displaySuccess(res?.message);
        queryClient.invalidateQueries([queryKeys.getAllAgencies]);
        if (handleModalClose) {
          handleModalClose('createAgency');
        }
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

export { useGetAllAgency, useAgencyCreationMutation };
