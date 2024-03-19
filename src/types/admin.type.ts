import { IBaseResponse, IDataCount } from './auth.type';
import { IBaseQueryProps } from './pentrarHub.type';

export type IFarmerQueryProp = IBaseQueryProps;

export type IAggregatorQueryProp = IBaseQueryProps;

export type IProduceQueryProp = IBaseQueryProps;

export type ISubAdminQuery = IBaseQueryProps;

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
