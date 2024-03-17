export type IFormComponentType = {
  currentStep?: number;
  action?: () => void;
  previous?: () => void;
};

export type IVerifyProp = {
  code: string;
  phone_number: string;
};
type Code = string;

export type IDTO = {
  data: Code;
};
export type IForgetProp = {
  email: string;
};

export type IResetProp = {
  code: string;
  new_password: string;
};

export type IBaseResponse = {
  status: true;
  statusCode: number;
  message: string;
};

export type IDataCount = {
  total: number;
  total_pages: number;
  current_page: number;
  page_size: number;
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

export type IchangePasswordPayload = Pick<IChangePassword, 'new_password'> & {
  current_password: string;
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
  email?: string;
  phone_number?: string;
  full_name?: string;
};

export type IFormComleteType = {
  coy_name: string;
  coy_address: string;
  reg_number: string;
  tin_id: string;
  category_type: string;
  coy_scale: string;
  coy_establishment: string;
  farm_name: string;
  farm_location: string;
  farming_scale: string;
  farm_land_ownership: string;
};

export type IFormIndividualType = Pick<
  IFormComleteType,
  'farm_location' | 'farm_name' | 'farming_scale' | 'farm_land_ownership'
>;

export type IFormCompanyType = Pick<
  IFormComleteType,
  | 'reg_number'
  | 'tin_id'
  | 'coy_address'
  | 'coy_name'
  | 'coy_scale'
  | 'coy_establishment'
>;

export type IFormType = {
  setRevealForm: React.Dispatch<
    React.SetStateAction<{
      formType: string;
      showForm: boolean;
    }>
  >;
};
