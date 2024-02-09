import { useModalContext } from '@contexts/modalContext';
import ModalBoxLayout from '@shared/ModalBoxLayout';
import { IoCloseOutline } from 'react-icons/io5';

function ModalBaseWrapper({
  children,
  closingText,
  widthValue,
  showCloseBtn = true,
  useBackground = true,
}: {
  children: React.ReactNode;
  closingText: string;
  widthValue?: string;
  showCloseBtn?: boolean;
  useBackground?: boolean;
}) {
  const { modalState, handleModalClose } = useModalContext();

  const width = widthValue || '400px';

  const closeAction = () => handleModalClose(closingText);

  return (
    <ModalBoxLayout
      openModalBox={modalState?.openModal}
      onBackgroundClick={useBackground ? closeAction : undefined}
    >
      {showCloseBtn && (
        <div
          className={`flex justify-end mb-[10px]`}
          style={{
            width: width,
          }}
        >
          <div
            className="bg-white h-[30px] w-[30px] rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => handleModalClose(closingText)}
          >
            <IoCloseOutline />
          </div>
        </div>
      )}
      {children}
    </ModalBoxLayout>
  );
}

export default ModalBaseWrapper;
