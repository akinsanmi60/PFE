import { IBaseResponse, IDataCount } from 'types/auth.type';
import { IBaseQueryProps } from './pentrarHub.type';
import { IAgencyTab } from '@utils/paths';

export type IAgencyTeamMemberQuery = IBaseQueryProps;

export type IBaseAnalysisProps = {
  id: string;
  currentTab: string;
  tabsHref: Record<IAgencyTab, string>;
};

export type IAgencyViewDetailPage<TData> = {
  agencyDetailProps: IBaseAnalysisProps & {
    userData: TData;
  };
};

export type IShowAgencyAnalysis = {
  showAgencyAnalysisProp: IBaseAnalysisProps & {
    pentrar_id?: string;
  };
};

export type IAgencyShowTableSummary = {
  analysisProp: Pick<IBaseAnalysisProps, 'id'>;
};

export type IAgencyTeamData = {
  role: string;
  id: string;
  created_at: string;
  full_name: string;
  phone_number: string;
  email: string;
  updated_at: string;
  is_active: boolean;
  passport_img: string;
  agency_team_id: string;
  status: string;
  last_active: string;
};

export type IIndividualAgencyData = {
  id: string;
  created_at: string;
  updated_at: string;
  agency_name: string;
  last_active: string;
  email: string;
  role: string;
  user_type: string;
  status: string;
  is_active: boolean;
  pentrar_id: string;
  agency_address: string;
  agency_establishment: string;
  agency_state: string;
  agency_reg_number: string;
  passport_img: string;
  phone_number: string;
  agency_team_members: IAgencyTeamData[];
};

export type IAgencyDataRes = IDataCount & {
  agency_list: IIndividualAgencyData[];
};

export type IAgencyDataResponse = IBaseResponse & {
  data: IAgencyDataRes;
};

export type IIndividualAgencyResponse = IBaseResponse & {
  data: IIndividualAgencyData;
};

export type IGetAgencyTeamData = IDataCount & {
  agency_member_list: IAgencyTeamData[];
};

export type IGetAgencyTeamResponse = IBaseResponse & {
  data: IGetAgencyTeamData;
};
