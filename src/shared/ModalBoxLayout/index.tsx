import { IModalBoxType } from 'types/modal.type';

const ModalBoxLayout = ({
  openModalBox,
  children,
  onBackgroundClick,
}: IModalBoxType) => {
  return (
    openModalBox && (
      <div className="relative">
        <div
          className="fixed inset-0 z-[70] transition-opacity bg-gray-500 bg-opacity-75 overflow-auto"
          onClick={onBackgroundClick}
        >
          {/* <div className="fixed inset-0 z-[99999] overflow-x-hidden overflow-y-auto"> */}
          <div className=" z-[999999] flex flex-col items-center justify-center min-h-full">
            {children}
          </div>
          {/* </div> */}
        </div>
      </div>
    )
  );
};

export default ModalBoxLayout;
