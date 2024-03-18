import { IBaseResponse } from './auth.type';

export type IPendingData = {
  name: string;
  quantity: number;
  unit: string;
  status: string;
};
export type IFarmerAggregatorDashboardcount = IBaseResponse & {
  data: {
    counted_produce: number;
    pending_produce: number;
    detail_pending_produce: IPendingData;
    approved_produce: number;
  };
};

export type IPendingProducePprop = {
  produceValue: {
    produceDetail: IPendingData;
    loading?: boolean;
  };
};

export type IDashboardHeroFOrFarmerAggregator = {
  dashboardProp: {
    id: string | undefined;
    role: string | undefined;
    userStatus: string | undefined;
  };
};

export type IRecentProduceDetail = {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  quantity: number;
  unit: string;
  certification: string;
  farm_address: string;
  pentrar_produce_id: string;
  farm_state: string;
  harvest_date: string;
  status: string;
};

export type IDashboardRecentProduce = IBaseResponse & {
  data: IRecentProduceDetail[];
};
