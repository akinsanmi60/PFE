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

export type ISaveDetailContextValue = {
  url: string | null;
};

export type ISaveDetailContextType = {
  saveDetails: ISaveDetailContextValue;
  setSaveDetails: React.Dispatch<React.SetStateAction<ISaveDetailContextValue>>;
};
export type IModalContextType = {
  modalState: IModalContextValue;
  setModalState: React.Dispatch<React.SetStateAction<IModalContextValue>>;
  handleModalClose: (_type: string) => void;
  handleModalOpen: (_type: string) => void;
};

export type IAgencyContextValue = {
  agency_attached_to: string;
  agency_name: string;
};

export type IUserCTXType = {
  exp: number;
  id: string;
  user_id: string;
  email: string;
  password: string;
  image: string;
  full_name: string;
  isEmail_verified: boolean;
  category_type: string;
  user_type: string;
  pentrar_id: string;
  status: string;
  phone_number: string;
  last_login: string;
  created_at: string;
  role: string;
  gender: string;
  coy_name: string;
  reg_number: string;
  tin_id: string;
  coy_address: string;
  is_active: boolean;
} & IAgencyContextValue;
