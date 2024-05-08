import { displayError, displaySuccess } from '@shared/Toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequest, patchRequest } from '@utils/apiCaller';
import {
  ADMIN_UPDATE_CONSENT_CERTIFICATION_URL,
  AGENCY_UPDATE_CERTIFICATION_URL,
  GET_ALL_CERTIFICATIONS_URL,
  GET_CERTIFICATION_URL,
  UPDATE_CERTIFICATION_URL,
} from '@utils/apiUrl';
import { queryKeys } from '@utils/queryKey';
import { queryParamsHelper } from 'config/query-params';
import { IBaseResponse } from 'types/auth.type';
import {
  ICertification,
  ICertificationByIdRes,
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

const useGetCertificationById = (
  id: string,
  userId: string,
  userType: string,
) => {
  const { isLoading, isRefetching, data, ...rest } =
    useQuery<ICertificationByIdRes>(
      [queryKeys.getIndividualCertificate],
      () => getRequest({ url: GET_CERTIFICATION_URL(id, userId, userType) }),
      {
        refetchOnWindowFocus: false,
      },
    );
  return {
    isLoading,
    isRefetching,
    ...rest,
    data: data?.data as ICertification,
  };
};

const useUpdateCertificationMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    ({
      payload,
      idData,
    }: {
      payload: { status: string };
      idData: {
        id: string;
        agencyId: string;
        agentId: string;
      };
    }) =>
      patchRequest<{ status: string }, IBaseResponse>({
        url: UPDATE_CERTIFICATION_URL(
          idData.id,
          idData.agencyId,
          idData.agentId,
        ),
        payload,
      }),
    {
      onSuccess(res) {
        displaySuccess(res?.message);
        queryClient.invalidateQueries([queryKeys.getIndividualCertificate]);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};
const useAgencyUpdateCertificationMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    ({
      payload,
      idData,
    }: {
      payload: { status: string };
      idData: {
        id: string;
        agencyId: string;
      };
    }) =>
      patchRequest<{ status: string }, IBaseResponse>({
        url: AGENCY_UPDATE_CERTIFICATION_URL(idData.id, idData.agencyId),
        payload,
      }),
    {
      onSuccess(res) {
        displaySuccess(res?.message);
        queryClient.invalidateQueries([queryKeys.getIndividualCertificate]);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

const useAdminUpdateConsentMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, ...rest } = useMutation(
    ({
      idData,
    }: {
      idData: {
        id: string;
        adminId: string;
      };
    }) =>
      patchRequest({
        url: ADMIN_UPDATE_CONSENT_CERTIFICATION_URL(idData.id, idData.adminId),
      }),
    {
      onSuccess(res) {
        const response = res as IBaseResponse;
        displaySuccess(response?.message);
        queryClient.invalidateQueries([queryKeys.getSingleProduce]);
      },
      onError(error) {
        displayError(error);
      },
    },
  );

  return { mutate, isLoading, ...rest };
};

export {
  useGetAllCertification,
  useGetCertificationById,
  useUpdateCertificationMutation,
  useAgencyUpdateCertificationMutation,
  useAdminUpdateConsentMutation,
};
