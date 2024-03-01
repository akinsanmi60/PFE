import { IBaseResponse } from './auth.type';

export type IPendingData = {
  name: string;
  quantity: number;
  unit: string;
  certification: string;
};
export type IFarmerAggregatorDashboardcount = IBaseResponse & {
  data: {
    countedProduce: 0;
    pendingProduce: 0;
    detailPendingProduce: IPendingData;
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
  };
};
