import { UseFormReset } from 'react-hook-form';
import { useModalContext } from '@contexts/modalContext';
import { displaySuccess, displayError } from '@shared/Toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest } from '@utils/apiCaller';
import {
  ADD_AGENCY_URL,
  GET_AGENCY_DASHBOARD_COUNT_URL,
  GET_AGENCYTEAM_MEMBER_URL,
  GET_ALL_AGENCY_URL,
  GET_INDIVIDUAL_AGENCY_URL,
  TEAMMEMBER_COUNT_URL,
  CREATE_AGENCY_TEAMMEMBER,
  TEAMMEMBER_TASKS_COUNT_URL,
  GET_INDIVIDUAL_TEAM_MEMBER_URL,
  TEAMMEMBER_TASKS_URL,
} from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { queryParamsHelper } from 'config/query-params';
import { IAgencyQuery, ICreateAgency, ITeamCreateType } from 'types/admin.type';
import {
  IAgencyDataResponse,
  IAgencyDataRes,
  IIndividualAgencyResponse,
  IIndividualAgencyData,
  IGetAgencyTeamResponse,
  IGetAgencyTeamData,
  IGetAgencyTeamCountResponse,
  IGetTeamMemberTaskCountRes,
  IGetIndividualTeamMember,
  IAgencyTeamData,
  IGetIndividualTasksResponse,
} from 'types/agency.type';
import { IBaseResponse } from 'types/auth.type';
import { IFilterProduceQuery } from 'types/produce.type';

const useGetAllAgency = (queryParams: IAgencyQuery) => {
  const { data, isLoading, isRefetching, isError, ...rest } =
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
    ...rest,
    isLoading,
    isRefetching,
    isError,
    data: data?.data as IAgencyDataRes,
  };
};

const useAgencyCreationMutation = ({
  resetForm,
}: {
  resetForm: UseFormReset<ICreateAgency>;
}) => {
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
          resetForm();
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

const useGetIndividualAgency = (id: string) => {
  const { data, isLoading, isRefetching, isError } =
    useQuery<IIndividualAgencyResponse>(
      [queryKeys.getIndividualAgency],
      () =>
        getRequest({
          url: GET_INDIVIDUAL_AGENCY_URL(id),
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    isError,
    data: data?.data as IIndividualAgencyData,
  };
};

const useGetAgencyTeamMember = (
  queryParams: IFilterProduceQuery,
  id: string,
) => {
  const { data, isLoading, isRefetching, isError } =
    useQuery<IGetAgencyTeamResponse>(
      [queryKeys.getAgencyTeamMembers, queryParams],
      () =>
        getRequest({
          url: `${GET_AGENCYTEAM_MEMBER_URL(id)}${queryParamsHelper(
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
    data: data?.data as IGetAgencyTeamData,
  };
};

const useGetAgencyDashboard = (id: string) => {
  const { isLoading, isRefetching, isError, data } = useQuery<any>(
    [queryKeys.getAdminDashboardCount],
    () =>
      getRequest({
        url: GET_AGENCY_DASHBOARD_COUNT_URL(id),
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

const useGetAgencyTeamCount = (id: string) => {
  const { isLoading, isRefetching, data, ...rest } =
    useQuery<IGetAgencyTeamCountResponse>(
      [queryKeys.getTeamMemberCount],
      () =>
        getRequest({
          url: TEAMMEMBER_COUNT_URL(id),
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    data: data?.data,
    ...rest,
  };
};

const useTeamCreationMutation = ({
  resetForm,
}: {
  resetForm: UseFormReset<ITeamCreateType>;
}) => {
  const { handleModalClose } = useModalContext();

  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    ({ payload, id }: { payload: ITeamCreateType; id: string }) =>
      postRequest<ITeamCreateType, IBaseResponse>({
        url: CREATE_AGENCY_TEAMMEMBER(id),
        payload,
      }),

    {
      onSuccess(res) {
        displaySuccess(res?.message);
        queryClient.invalidateQueries([queryKeys.getAgencyTeamMembers]);
        if (handleModalClose) {
          resetForm();
          handleModalClose('addTeamMember');
        }
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

const useGetAgencyTeamTaskCount = (id: string, agencyId: string) => {
  const { isLoading, isRefetching, data, ...rest } =
    useQuery<IGetTeamMemberTaskCountRes>(
      [queryKeys.getAgencyTeamTaskCount],
      () =>
        getRequest({
          url: TEAMMEMBER_TASKS_COUNT_URL(id, agencyId),
        }),
      {
        refetchOnWindowFocus: false,
      },
    );

  return {
    isLoading,
    isRefetching,
    data: data?.data,
    ...rest,
  };
};

const useGetIndividualTeamMember = (id: string, agencyId: string) => {
  const { data, isLoading, isRefetching, isError, ...rest } =
    useQuery<IGetIndividualTeamMember>(
      [queryKeys.getIndividualTeamMember],
      () =>
        getRequest({
          url: GET_INDIVIDUAL_TEAM_MEMBER_URL(id, agencyId),
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
    data: data?.data as IAgencyTeamData,
  };
};

const useGetIndividualTeamTask = (
  id: string,
  agencyId: string,
  queryParams: IFilterProduceQuery,
) => {
  const { isLoading, isRefetching, data, ...rest } =
    useQuery<IGetIndividualTasksResponse>(
      [queryKeys.getIndividualTasks, queryParams],
      () =>
        getRequest({
          url: `${TEAMMEMBER_TASKS_URL(id, agencyId)}${queryParamsHelper(
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
    data: data?.data,
    ...rest,
  };
};

export {
  useGetAllAgency,
  useAgencyCreationMutation,
  useGetIndividualAgency,
  useGetAgencyTeamMember,
  useGetAgencyDashboard,
  useGetAgencyTeamCount,
  useTeamCreationMutation,
  useGetAgencyTeamTaskCount,
  useGetIndividualTeamMember,
  useGetIndividualTeamTask,
};
