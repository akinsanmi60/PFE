import { useModalContext } from '@contexts/modalContext';
import ModalBoxLayout from '@shared/ModalBoxLayout';
import { IoCloseOutline } from 'react-icons/io5';
import { IModalBaseProps } from './modalBaseType';
import CustomButton from '@shared/Button';

function ModalBaseWrapper({ children, modalBaseProp }: IModalBaseProps) {
  const {
    closingText,
    closeBtnwidth,
    showCloseBtn = true,
    useBackground = true,
    formWidth,
    useModalActionBtn,
    cancelText,
    actionText,
    className,
  } = modalBaseProp;
  const { modalState, handleModalClose } = useModalContext();

  const width = closeBtnwidth || '400px';

  const closeAction = () => {
    handleModalClose(closingText as string);
  };

  return (
    <ModalBoxLayout
      openModalBox={modalState?.openModal}
      onBackgroundClick={useBackground ? closeAction : undefined}
    >
      <div
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {showCloseBtn && (
          <div
            className={`flex justify-end mb-[10px]`}
            style={{
              width: width,
            }}
          >
            <div
              className="bg-primary-white h-[30px] w-[30px] rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => handleModalClose(closingText as string)}
            >
              <IoCloseOutline />
            </div>
          </div>
        )}
        <div
          className={`w-[${
            formWidth ? formWidth : '100%'
          }] rounded-[16px] p-[24px] bg-primary-white ${className}`}
        >
          {children}

          {useModalActionBtn && (
            <div className="flex justify-end gap-4 mt-[40px] w-[100%]">
              <div className="">
                <div className="flex gap-[15px]">
                  <CustomButton
                    variant={'outline'}
                    className="border-primary-main border-[1px]  bg-transparent text-primary-main w-[120px]"
                  >
                    {cancelText}
                  </CustomButton>
                  <CustomButton className="bg-primary-main text-primary-white w-[180px]">
                    {actionText}
                  </CustomButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalBoxLayout>
  );
}

export default ModalBaseWrapper;
