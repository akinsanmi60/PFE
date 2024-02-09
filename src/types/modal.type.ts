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
