import { IBaseResponse, IFormComleteType } from './auth.type';
import { IMyProduceData } from './produce.type';

type IListOfProduce = Pick<
  IMyProduceData,
  | 'id'
  | 'pentrar_produce_id'
  | 'quantity'
  | 'unit'
  | 'farm_state'
  | 'produce_classification'
  | 'created_at'
  | 'updated_at'
>;
export type IIndividualFarmer = IFormComleteType & {
  id: string;
  created_at: string;
  email: string;
  full_name: string;
  is_active: false;
  last_active: string;
  pentrar_id: string;
  phone_number: string;
  updated_at: string;
  user_type: string;
  category_type: string;
  status: string;
  gender: string;
  list_of_produce: IListOfProduce[];
  user_update_submited: boolean;
};

export type IIndividualAggregator = IIndividualFarmer & {
  farmers: IIndividualFarmer[];
};

export type IIndividualResponse = IBaseResponse & {
  data: IIndividualFarmer;
};

export type IIndividualAggregatorResponse = IBaseResponse & {
  data: IIndividualAggregator;
};
export type IIndividualUrlParams = {
  queryParamsId: string;
  url: (_id: string) => string;
};
