export type IFormComponentType = {
  formStep: number;
  nextFormStep?: () => void;
  revealForm?: {
    formType: string;
    showForm: boolean;
  };
  setRevealForm?: React.Dispatch<
    React.SetStateAction<{
      formType: string;
      showForm: boolean;
    }>
  >;
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
export type IChangeSecurity = {
  password: string;
  security_answer: string;
  security_question: string;
};

export type ILoginFormData = {
  email: string;
  password: string;
};
