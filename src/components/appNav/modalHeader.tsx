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
    <div className="flex items-center gap-x-1 mb-[14px]">
      <LeftChevron
        className="inline-block mr-2 cursor-pointer"
        onClick={() => handleModalClose(modalHeaderProp.actionText)}
      />
      <h2>{modalHeaderProp.title}</h2>
    </div>
  );
}

export default ModalHeader;
