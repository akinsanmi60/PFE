import { IModalProps } from './interface';
import { twMerge } from 'tailwind-merge';
import Button from 'shared/Button';
import ModalBase from './ModalBase';

const defaultAction = {
  show: true,
  text: 'Confirm',
};

const Modal = ({
  onClose,
  icon,
  children,
  header,
  action: propsAction,
  secondaryAction,
  ...rest
}: IModalProps) => {
  const action = {
    ...defaultAction,
    ...propsAction,
  };

  return (
    <ModalBase
      {...rest}
      onClose={onClose}
      header={
        <>
          {icon !== null ? <>{icon}</> : null}
          <div
            className={`text-[#0F172A] text-base font-semibold${
              icon !== null ? ' mt-[16px]' : ''
            }`}
          >
            {header}
          </div>
        </>
      }
    >
      {children}
      <div className="w-full grid grid-flow-col gap-[24px] mt-[16px] pt-[24px]">
        {secondaryAction?.show && secondaryAction?.text && (
          <Button
            className={twMerge('w-full', secondaryAction?.className)}
            onClick={secondaryAction?.onClick}
            loading={secondaryAction?.loading}
            loadingText={secondaryAction?.loadingText}
            disabled={secondaryAction?.disabled}
            variant={secondaryAction?.variant}
            color={secondaryAction?.color}
          >
            {secondaryAction?.text}
          </Button>
        )}
        {action?.show && action?.text && (
          <Button
            className={twMerge('w-full', action?.className)}
            onClick={action?.onClick}
            loading={action?.loading}
            loadingText={action?.loadingText}
            disabled={action?.disabled}
            variant={action?.variant}
            color={action?.color}
          >
            {action?.text}
          </Button>
        )}
      </div>
    </ModalBase>
  );
};

Modal.defaultProps = {
  action: defaultAction,
};

export default Modal;
