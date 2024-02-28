import { useModalContext } from '@contexts/modalContext';
import EditPhone from './editPhone/editPhone';

function PersonalInformation() {
  const { modalState, handleModalOpen } = useModalContext();

  const actionArray = [
    {
      name: 'Edit phone',
      action: () => {
        handleModalOpen('phone');
      },
    },
    {
      name: 'Edit email',
      action: () => {
        handleModalOpen('email');
      },
    },
  ];

  return (
    <>
      <div className="p-[24px] font-primary">
        <div className="flex justify-between items-center border-b-[1px] border-background-borderlight-1 pb-[18px]">
          <div>
            <p className="text-[20px] font-[600] leading-[28px]">
              Personal Info
            </p>
          </div>
          <div className="flex gap-[18px] items-center text-[13px]">
            {actionArray.map(action => (
              <p
                key={action.name}
                onClick={action.action}
                className="hover:cursor-pointer hover:font-[600] hover:underline hover:text-statusText-success"
              >
                {action.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      {modalState.modalType === 'phone' && <EditPhone />}
      {modalState.modalType === 'email' && <> hi</>}
    </>
  );
}

export default PersonalInformation;
