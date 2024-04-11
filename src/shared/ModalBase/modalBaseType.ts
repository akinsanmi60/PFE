import { IButtonProps } from '@shared/Button/interface';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export type IModalBaseProps = {
  children: React.ReactNode;
  modalBaseProp: {
    closingText?: string;
    closeBtnwidth?: string;
    showCloseBtn?: boolean;
    useBackground?: boolean;
    formWidth?: string;
    useModalActionBtn?: boolean;
    cancelText?: string;
    className?: string;
    actionText?: string;
    header?: string;
    onClose?: () => void;
    clearAll?: () => void;
  };
};

type IModalActionProps = {
  show?: boolean;
  text?: React.ReactNode;
  variant?: IButtonProps['variant'];
  color?: IButtonProps['color'];
  onClick?: (_data: any) => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  loadingText?: React.ReactNode;
};

export type IFilterModalProps<TFieldValues extends FieldValues> =
  IModalBaseProps & {
    action?: IModalActionProps;
    showClearAll?: boolean;
    form: UseFormReturn<TFieldValues>;
  };
