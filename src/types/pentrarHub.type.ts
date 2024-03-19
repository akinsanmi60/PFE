import { IBaseResponse } from './auth.type';
import { IMyProduceData } from './produce.type';

export type IPentrarHubDropdown = {
  setPopluar?: (_value: string) => void;
  setState?: (_value: string) => void;
};

export type IProduceItemList = {
  created_at: string;
  name: string;
  on_pentrar_hub: boolean;
  id: string;
  pentrar_produce_id: string;
  quantity: number;
  unit: string;
  farm_state: string;
  updated_at: string;
  images: string[];
  description: string;
  harvest_date: string | undefined | null;
  farmer_owner_id: string;
  aggregator_owner_id: string;
} & Pick<
  IMyProduceData,
  | 'owner_name'
  | 'owner_phone'
  | 'owner_phone'
  | 'owner_pentrar_id'
  | 'owner_type'
>;

export type IBaseQueryProps = {
  search?: string;
  page?: number;
  limit?: number;
};

export type IQueryHubProp = {
  search?: string;
  page?: number;
  limit?: number;
  state?: string;
  popular_produce?: string;
};

export type IGetPentrarHubData = {
  total: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  produces_list: IProduceItemList[];
};

export type IPentrarHubResponse = IBaseResponse & {
  data: IGetPentrarHubData;
};
