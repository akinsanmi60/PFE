import { useState } from 'react';
import { ReactComponent as SettingsWhite } from '@assets/svg/dashSettingWhite.svg';
import CustomButton from '@shared/Button';
import { useAuthContext } from '@contexts/authContext';
import {
  useAcceptTransferProduce,
  useRejectTransferProduce,
} from 'services/produce.service';

function TransferRenderButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const { authUser } = useAuthContext();

  const handleOpen = () => {
    setOpen(!open);
  };

  const { mutate: rejectMutate, isLoading: rejectLoading } =
    useRejectTransferProduce();

  const { mutate: acceptMutate, isLoading: acceptLoading } =
    useAcceptTransferProduce();

  const actions = [
    {
      title: 'Accept',
    },
    {
      title: 'Reject',
    },
  ];

  const switchAction = (action: string) => {
    if (action === 'Accept') {
      acceptMutate({ payload: { id: id, userId: authUser?.id as string } });
    } else if (action === 'Reject') {
      rejectMutate({ payload: { id: id, userId: authUser?.id as string } });
    }
  };

  const loading = acceptLoading || rejectLoading;

  return (
    <div className="relative">
      <CustomButton
        loading={loading}
        loadingText="Loading..."
        onClick={handleOpen}
        className="py-[8px] flex items-center gap-[10px]  px-[40px] text-[16px] leading-[22px] font-[600] text-[#ffffff]"
      >
        <SettingsWhite /> Action
      </CustomButton>

      <div>
        {open && (
          <div className="absolute top-[50px] h-[70px] w-[110px] rounded-[8px] shadow-md bg-primary-white py-[4px] px-[10px]">
            {actions.map(actionObj => (
              <p
                key={actionObj.title}
                onClick={() => switchAction(actionObj.title)}
                className="text-primary-main text-[16px] leading-[24px] font-[500] py-[4px] cursor-pointer hover:text-secondary-light-1 hover:font-[500]"
              >
                {actionObj?.title}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TransferRenderButton;
