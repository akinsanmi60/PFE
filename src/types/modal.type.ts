import { UseFormReturn } from 'react-hook-form';

export type IModalPopType = {
  modalType: string;
  openModal: boolean;
  message: string;
};
export type IModalBoxType = {
  openModalBox: boolean;
  children?: React.ReactNode;
  onBackgroundClick?: () => void;
};
export type IRenderIfProps = {
  condition: boolean;
  children: React.ReactNode;
};

export type IFilterValues = {
  status?: string;
  created_at?: string;
  updated_at?: string;
  on_pentrar_hub?: string;
  is_active?: string;
  produce_ownership?: string;
};

export type IFilterForm = {
  closeModalBox: () => void;
  setFilterValues?: React.Dispatch<React.SetStateAction<IFilterValues>>;
  filterValues?: IFilterValues;
  filterForm: UseFormReturn<IFilterValues>;
  onSubmitForm: (_data: IFilterValues) => void;
  clearFunction?: () => void;
  filterTitle?: string;
  watchValue?: string;
};
