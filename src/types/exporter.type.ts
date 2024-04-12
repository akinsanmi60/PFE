import { IBaseResponse, IDataCount } from './auth.type';
import {
  IIndividualAggregator,
  IIndividualFarmer,
} from './individualFarmerAggregator.type';

export type IExporterData = {
  id: string;
  created_at: string;
  coy_name: string;
  last_active: string;
  legal_entity_name: string;
  phone_number: string;
  user_type: string;
  status: string;
  email: string;
  updated_at: string;
  user_update_submited: boolean;
  is_active: boolean;
  pentrar_id: string;
  aggregators: IIndividualAggregator[];
  farmers: IIndividualFarmer[];
  transporters: [];
};

export type IIndividualExporterDataResponse = IBaseResponse & {
  data: IExporterData;
};

export type IExporterDataRes = IDataCount & {
  exporters_list: IExporterData[];
};

export type IGetExportersResponse = IBaseResponse & {
  data: IExporterDataRes;
};
