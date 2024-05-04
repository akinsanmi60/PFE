import { IBaseResponse, IDataCount } from './auth.type';
import { IBaseQueryProps } from './pentrarHub.type';

export type IFarmerQueryProp = IBaseQueryProps;

export type IAggregatorQueryProp = IBaseQueryProps;

export type IProduceQueryProp = IBaseQueryProps;

export type ISubAdminQuery = IBaseQueryProps;

export type IAgencyQuery = IBaseQueryProps;

export type IAdminData = {
  id: string;
  created_at: Date;
  updated_at: Date;
  email: string;
  phone_number: string;
  full_name: string;
  gender: string;
  pentrar_id: string;
  last_active: string;
  passport_img: string;
  permissions: string[];
  user_type: string;
  role: string;
  is_active: boolean;
  status: string;
};

export type IDataRes = IDataCount & {
  subAdmin_list: IAdminData[];
};

export type IAdminDataResponse = IBaseResponse & {
  data: IDataRes;
};

export type IGetAdminData = IBaseResponse & {
  data: IAdminData;
};

export type ICreateAgency = {
  agency_name: string;
  email: string;
  phone_number: string;
  agency_address: string;
  agency_state: string;
  agency_establishment: string;
  agency_reg_number: string;
  head_name: string;
  head_of_agency_phone: string;
  head_of_agency_email: string;
  agency_type: string;
  gender: string;
};

export type ITeamCreateType = {
  agent_email: string;
  agent_full_name: string;
  agent_phone_number: string;
  agent_role: string;
  agency_type: string;
  gender: string;
};
