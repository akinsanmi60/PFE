import { IBaseResponse } from './auth.type';

export type IStartChangeFormData = {
  old_phone: string;
  new_phone: string;
  password: string;
};
export type IStartFormData = Omit<IStartChangeFormData, 'old_phone'>;

export type IStartResponse = {
  data: any;
} & IBaseResponse;

export type ICompleteChangeFormData = {
  new_phone: string;
  code: string;
};
export type ICompleteFormData = Omit<ICompleteChangeFormData, 'new_phone'>;
