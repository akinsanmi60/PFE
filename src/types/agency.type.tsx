import { IBaseResponse, IDataCount } from 'types/auth.type';

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
};

export type IAgencyDataRes = IDataCount & {
  agency_list: IIndividualAgencyData[];
};

export type IAgencyDataResponse = IBaseResponse & {
  data: IAgencyDataRes;
};
