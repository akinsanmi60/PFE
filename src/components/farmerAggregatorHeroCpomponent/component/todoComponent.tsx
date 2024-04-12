import { useModalContext } from '@contexts/modalContext';
import CompleteProfile from '@modules/authentication/completeProfile';
import CustomButton from '@shared/Button';

function TodoComponent({
  modalText = 'completeProfile',
}: {
  modalText?: string;
}) {
  const { handleModalOpen, modalState } = useModalContext();
  return (
    <>
      <div className="bg-primary-white px-[24px] py-[11px] rounded-lg border-[#F8D3D4] border-[2px]">
        <p className="text-[16px] font-[600] text-primary-main tracking-normal">
          Action Needed
        </p>
        <p className="text-[14px] font-[600] text-tertiary-light-3 ">
          Please complete your profile
        </p>

        <div className="flex justify-end">
          <CustomButton
            className="bg-[#E03137] text-primary-white text-[8px] font-[600]"
            sx={{ borderRadius: '40px', px: 4, py: 0 }}
            onClick={() => handleModalOpen(modalText)}
          >
            Complete Profile
          </CustomButton>
        </div>
      </div>
      {modalState?.modalType === 'completeProfile' && <CompleteProfile />}
      {modalState?.modalType === 'exporterProfile' && <CompleteProfile />}
    </>
  );
}

export default TodoComponent;
