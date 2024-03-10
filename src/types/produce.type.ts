import { IBaseResponse } from './auth.type';
import { IBaseQueryProps } from './pentrarHub.type';

export type IUserQueryProps = IBaseQueryProps;

export type IAddProducePayload = {
  name: string;
  quantity: number;
  unit: string;
  description: string;
  farm_address: string;
  harvest_date: string;
  farm_state: string;
  planting_date: string;
  storage: string;
  season: string;
  weather: string;
  images: FormData;
};

export type IMyProduceData = {
  id: string;
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
  farm_address: string;
  farm_state: string;
  name: string;
  certification: string;
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
