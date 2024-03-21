import { IModalProps } from './interface';
import { ReactComponent as AlertHexagon } from '@assets/svg/alert-hexagon.svg';
import { twMerge } from 'tailwind-merge';
// import ModalBoxLayout from 'shared/ModalBoxLayout';
import { ReactComponent as CancelIcon } from '@assets/svg/x-close.svg';

const defaultAction = {
  show: true,
  text: 'Confirm',
};

const Drawer = ({
  onClose,
  icon,
  children,
  header,
  containerClassName,
  subHeader,
}: // ...rest
IModalProps) => {
  return (
    <div className="fixed flex inset-0 z-[99999] transition-opacity overflow-auto w-[100vw] h-[100vh]">
      <div
        className="fixed inset-0 z-[0] bg-gray-500 bg-opacity-75 overflow-auto w-[100vw] h-[100vh]"
        onClick={() => {
          onClose();
        }}
      ></div>
      <div
        className={twMerge(
          `bg-white grid absolute left-auto right-0 w-full max-w-[400px] h-full overflow-auto ${
            header ? 'auto-rows-max-auto' : ''
          }`,
          containerClassName,
        )}
      >
        {header && (
          <div className=" z-[1] p-[24px] pb-[20px] border-b-[1px] border-gray-100 w-full sticky top-[0px] bg-white">
            <>
              <div className="flex justify-between">
                {icon !== null ? (
                  <>
                    {icon ? (
                      icon
                    ) : (
                      <AlertHexagon className="bg-tertiary-light-1 p-[12px] rounded-[99999px]" />
                    )}
                  </>
                ) : null}
                <CancelIcon
                  className="w-[24px] h-[24px] cursor-pointer"
                  onClick={onClose}
                />
              </div>

              <div
                className={`text-[#0F172A] text-base font-semibold${
                  icon !== null ? ' mt-[18px]' : ''
                }`}
              >
                {header}
              </div>
            </>
            {subHeader && (
              <div
                className={`text-gray-400 text-[12px] ${
                  icon !== null ? ' mt-[6px]' : ''
                }`}
              >
                {subHeader}
              </div>
            )}
          </div>
        )}

        <div className="p-[24px]">{children}</div>

        {/*  <div className="w-full grid grid-flow-col gap-[24px] mt-[16px] pt-[24px]">
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
          </div> */}
      </div>
    </div>
  );
};

Drawer.defaultProps = {
  action: defaultAction,
};

export default Drawer;
