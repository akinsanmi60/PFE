import { IBaseResponse } from './auth.type';
import { IBaseQueryProps } from './pentrarHub.type';

export type IUserQueryProps = IBaseQueryProps;

export type IAddProducePayload = {
  name: string;
  quantity: string;
  unit: string;
  description: string;
  farm_address: string;
  harvest_date: string;
  farm_state: string;
  planting_date: string;
  produce_classification: string;
  storage: string;
};

export type ITransferProducePayload = Pick<
  IAddProducePayload,
  'quantity' | 'unit'
> & {
  email: string;
  user_type: string;
};

export type IProduceHandlerType = Pick<
  IAddProducePayload,
  'quantity' | 'unit'
> & {
  id: string;
  created_at: Date;
  produce_id: string;
  handler_farmer_id: string;
  handler_aggregator_id: string;
  handler_offtaker_id: string;
  handler_exporter_id: string;
  produce_location: string;
  handler_name: string;
  handler_phone: string;
  handler_user_type: string;
  produce_created_from: string;
};

export type IApproveProducePayload = Pick<
  IAddProducePayload,
  'quantity' | 'unit'
> & {
  package_location: string;
  package_state: string;
};

export type IMyProduceData = {
  id: string;
  can_transfer: boolean;
  created_at: string;
  updated_at: string;
  pentrar_produce_id: string;
  description: string;
  quantity: number;
  owner_name: string;
  owner_phone: string;
  owner_type: string;
  owner_pentrar_id: string;
  images: [];
  unit: string;
  on_pentrar_hub: boolean;
  harvest_date: string;
  planting_date: string;
  produce_classification: string;
  farm_address: string;
  farm_state: string;
  name: string;
  certification: string;
  status: string;
  transfer_handler: IProduceHandlerType[];
  submitted_quantity: number;
  submitted_unit: string;
};

export type IMyProduceResponse = IBaseResponse & {
  data: {
    total: number;
    total_pages: number;
    current_page: number;
    page_size: number;
    produces_list: IMyProduceData[];
  };
};

export type IGetSingleProduce = IBaseResponse & {
  data: IMyProduceData;
};
