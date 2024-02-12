export type IFormComponentType = {
  currentStep?: number;
  action?: () => void;
  previous?: () => void;
};

export type IVerifyProp = {
  code: string;
};
type Code = string;

export type IDTO = {
  data: Code;
};
export type IForgetProp = {
  email: string;
};

export type IBaseResponse = {
  message: string;
  success: true;
};

export type ILoginData = {
  accessToken: string;
  success: boolean;
};
export type ILoginResponse = {
  data: ILoginData;
} & IBaseResponse;

export type IChangePassword = {
  old_password: string;
  new_password: string;
  confirm_password?: string;
};

export type ILoginFormData = {
  email: string;
  password: string;
};

export type IRegister = {
  email?: string;
  password?: string;
  full_name?: string;
  user_type?: string;
  phone_number?: string;
  gender?: string;
  code?: string;
};

export type IPartialCreateUser = {
  email: 'string';
  phone_number: 'string';
  full_name: 'string';
};
