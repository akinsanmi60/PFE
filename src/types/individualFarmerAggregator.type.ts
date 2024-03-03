import { IBaseResponse } from './auth.type';

export type IIndividualFarmer = {
  id: string;
  created_at: string;
  email: string;
  full_name: string;
  is_active: false;
  last_active: string;
  pentrar_id: string;
  phone_number: string;
  status: string;
  gender: string;
};

export type IIndividualResponse = IBaseResponse & {
  data: IIndividualFarmer;
};

export type IIndividualUrlParams = {
  queryParamsId: string;
  url: (_id: string) => string;
};
