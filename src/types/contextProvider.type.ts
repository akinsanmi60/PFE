export type ProviderProps = {
  children: React.ReactNode;
};

export type IFormContextValue = {
  [x: string]: boolean | string | number;
};

export type IFormContextType = {
  multiFormValues: IFormContextValue;
  setmultiFormValues: React.Dispatch<React.SetStateAction<IFormContextValue>>;
  setFormValues: (_values: any) => void;
};

export type IModalContextValue = {
  modalType: string;
  openModal: boolean;
  message: string;
};

export type IModalContextType = {
  modalState: IModalContextValue;
  setModalState: React.Dispatch<React.SetStateAction<IModalContextValue>>;
  handleModalClose: (_type: string) => void;
  handleModalOpen: (_type: string) => void;
};

export type IUserCTXType = {
  exp: number;
  id: string;
  user_id: string;
  email: string;
  password: string;
  image: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  verification_code: string;
  isEmail_verified: boolean;
  account_type: string;
  account_status: string;
  lga: string;
  phone_number: string;
  state: string;
  area: string;
  address: string;
  otp_number: string;
  security_question: string;
  security_answer: string;
  last_login: string;
  created_at: string;
  roles: string;
  user_limit: number;
};
