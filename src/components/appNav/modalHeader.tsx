import { useModalContext } from '@contexts/modalContext';
import { ReactComponent as LeftChevron } from '@assets/svg/leftChevron.svg';

function ModalHeader({
  modalHeaderProp,
}: {
  modalHeaderProp: {
    title: string;
    actionText: string;
  };
}) {
  const { handleModalClose } = useModalContext();

  return (
    <div
      onClick={() => handleModalClose(modalHeaderProp.actionText)}
      className="flex items-center gap-x-1 mb-[14px] cursor-pointer"
    >
      <LeftChevron className="inline-block mr-2 " />
      <h2 className="font-[600]">{modalHeaderProp.title}</h2>
    </div>
  );
}

export default ModalHeader;
