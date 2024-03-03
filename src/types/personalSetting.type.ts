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

export type IStartChangeEmailFormData = {
  old_email: string;
  new_email: string;
  password: string;
};
export type IStartEmailFormData = Omit<IStartChangeEmailFormData, 'old_email'>;

export type ICompleteChangeEmailFormData = {
  new_email: string;
  code: string;
};
export type ICompleteEmailFormData = Omit<
  ICompleteChangeEmailFormData,
  'new_email'
>;

export type IUseCompletePhoneVerification = {
  url: string;
  closeModal: (_type: string) => void;
};

export type IUseCompleteEmailVerification = {
  url: string;
  closeModal: (_type: string) => void;
};
