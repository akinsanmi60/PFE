import CustomButton from '@shared/Button';
import { capitalize, getClass } from '@utils/constants';
import { ICertification } from 'types/certification.type';
import { ReactComponent as UpdateIcon } from '@assets/svg/updateIcon.svg';
import { useState } from 'react';
import {
  useUpdateCertificationMutation,
  useAgencyUpdateCertificationMutation,
} from 'services/certification.service';
import { useAuthContext } from '@contexts/authContext';

const certList = ['collected', 'processing', 'certified'];
const roleToAccessBtn = ['agency', 'agencyAdmin', 'agentSubAdmin'];
function StatusWithAction({ dataDetail }: { dataDetail: ICertification }) {
  const [openOptions, setOpenOptions] = useState(false);
  const { authUser } = useAuthContext();

  const handleOpenOptions = () => {
    if (dataDetail?.status === 'certified') {
      return;
    }
    setOpenOptions(!openOptions);
  };

  const { mutate: TeamMemberUpdate, isLoading: isteamMemberLoading } =
    useUpdateCertificationMutation();
  const { mutate, isLoading } = useAgencyUpdateCertificationMutation();

  const updateStatus = (value: string) => {
    setOpenOptions(false);
    if (authUser?.role === 'agency') {
      mutate({
        payload: { status: value },
        idData: {
          id: dataDetail.id,
          agencyId: dataDetail.agency_to,
        },
      });
    } else {
      TeamMemberUpdate({
        payload: { status: value },
        idData: {
          id: dataDetail.id,
          agencyId: dataDetail.agency_to,
          agentId: authUser?.id as string,
        },
      });
    }
  };

  const btnLoading = isteamMemberLoading || isLoading;

  return (
    <div className="relative">
      <div
        className={`${getClass(
          dataDetail.status,
        )} px-[24px] py-[23px] flex flex-col gap-y-4`}
      >
        <p>Current Status: {capitalize(dataDetail?.status)}</p>
        {roleToAccessBtn.includes(authUser?.role as string) && (
          <div>
            <CustomButton
              className="w-full text-primary-white"
              onClick={handleOpenOptions}
              loading={btnLoading}
              disabled={btnLoading}
              loadingText="Updating Status..."
              variant={btnLoading ? 'solid' : ''}
            >
              <span className="mr-3">
                {dataDetail?.status === 'certified'
                  ? 'Certified'
                  : 'Update Status'}
              </span>
              <span>
                <UpdateIcon />
              </span>
            </CustomButton>
          </div>
        )}
      </div>
      {openOptions && (
        <div className="absolute top-[135px] bg-primary-white w-full shadow-md rounded-lg py-[4px]">
          {certList.map(item => (
            <p
              key={item}
              className="font-[500] text-[16px] leading-[21px] text-primary-main cursor-pointer hover:bg-gray-100 px-[24px] py-2 rounded-md"
              onClick={() => updateStatus(item)}
            >
              {capitalize(item)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusWithAction;
