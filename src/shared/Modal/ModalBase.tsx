import { IModalBaseProps } from './interface';
import ModalBoxLayout from 'shared/ModalBoxLayout';
import { twMerge } from 'tailwind-merge';

const ModalBase = ({
  onClose,
  children,
  header,
  className,
  containerClassName,
}: IModalBaseProps) => {
  return (
    <ModalBoxLayout openModalBox={true} onBackgroundClick={onClose}>
      <div
        className="absolute top-[-16px] right-[-20px] bg-white rounded-full cursor-pointer p-[8px] h-[28px] w-[28px]"
        onClick={onClose}
      >
        X
      </div>
      {/* <CancelIcon
        className="absolute top-[-16px] right-[-20px] bg-white rounded-full cursor-pointer w-fit p-[8px] h-[28px] w-[28px]"
        onClick={onClose}
      /> */}
      <div className="w-full relative text-[14px] rounded-[32px] overflow-hidden">
        <div
          className={twMerge(
            `bg-white grid w-[calc(100vw_-_2rem)] max-w-[400px] max-h-[calc(100vh_-_40px)] overflow-auto ${
              header ? 'auto-rows-max-auto' : ''
            }`,
            containerClassName,
          )}
        >
          {header && (
            <div className=" z-[1] p-[24px] pb-[20px] border-b-[1px] border-gray-100 w-full sticky top-[0px] bg-white">
              {header}
            </div>
          )}
          <div className={twMerge(className, 'pt-[16px] pb-[40px] px-[24px]')}>
            {children}
          </div>
        </div>
      </div>
    </ModalBoxLayout>
  );
};

export default ModalBase;
