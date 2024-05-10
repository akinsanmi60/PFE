import { useModalContext } from '@contexts/modalContext';
import CustomButton from '@shared/Button';
import ModalBaseWrapper from '@shared/ModalBase';
import ModalHeader from 'components/appNav/modalHeader';
import { useProduceDeleteMutation } from 'services/produce.service';

function DeleteProduce({ id }: { id: string }) {
  const { handleModalClose } = useModalContext();

  const { mutate, isLoading } = useProduceDeleteMutation();

  const deleteProduceFn = () => {
    mutate({ id: id as string });
  };

  return (
    <ModalBaseWrapper
      modalBaseProp={{
        showCloseBtn: false,
        className: 'w-[450px]',
      }}
    >
      <ModalHeader
        modalHeaderProp={{
          title: 'Delete Produce',
          actionText: 'deleteProduce',
        }}
      />
      <p className="text-[14px] ">
        Are you sure you want to delete? This action cannot be undone, please be
        sure of what you are doing.
      </p>
      <div className="flex justify-end gap-[10px] mt-[40px]">
        <CustomButton
          onClick={() => handleModalClose('deleteProduce')}
          className="bg-transparent border-[1px] border-secondary-light-1 text-secondary-light-1"
        >
          Cancel
        </CustomButton>
        <CustomButton
          loadingText="Deleting..."
          loading={isLoading}
          onClick={deleteProduceFn}
          className="text-primary-white bg-statusText-error"
        >
          Delete
        </CustomButton>
      </div>
    </ModalBaseWrapper>
  );
}

export default DeleteProduce;
