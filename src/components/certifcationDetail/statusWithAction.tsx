import CustomButton from '@shared/Button';
import { capitalize, getClass } from '@utils/constants';
import { ICertification } from 'types/certification.type';
import { ReactComponent as UpdateIcon } from '@assets/svg/updateIcon.svg';
import { useState } from 'react';

const certList = ['collected', 'processing', 'certified'];
function StatusWithAction({ dataDetail }: { dataDetail: ICertification }) {
  const [openOptions, setOpenOptions] = useState(false);

  const handleOpenOptions = () => {
    setOpenOptions(!openOptions);
  };

  const updateStatus = (value: string) => {
    setOpenOptions(false);
    return value;
  };

  return (
    <div className="relative">
      <div
        className={`${getClass(
          'pending',
        )} px-[24px] py-[23px] flex flex-col gap-y-4`}
      >
        <p>Current Status: {capitalize(dataDetail?.status)}</p>

        <div>
          <CustomButton
            className="w-full text-primary-white"
            onClick={handleOpenOptions}
          >
            <span className="mr-3">Update Status</span>
            <span>
              <UpdateIcon />
            </span>
          </CustomButton>
        </div>
      </div>
      {openOptions && (
        <div className="absolute top-[135px] bg-primary-white w-full shadow-md rounded-lg py-[4px]">
          {certList.map(item => (
            <p
              key={item}
              className="font-[600] text-[16px] leading-[21px] text-primary-main cursor-pointer hover:bg-gray-100 px-[24px] py-2 rounded-md"
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
