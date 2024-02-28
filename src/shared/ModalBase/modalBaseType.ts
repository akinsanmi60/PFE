export type IModalBaseProps = {
  children: React.ReactNode;
  modalBaseProp: {
    closingText: string;
    closeBtnwidth?: string;
    showCloseBtn?: boolean;
    useBackground?: boolean;
    formWidth?: string;
    useModalActionBtn?: boolean;
    cancelText?: string;
    actionText?: string;
  };
};
