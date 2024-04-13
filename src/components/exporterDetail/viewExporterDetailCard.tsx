import { IExporterData } from 'types/exporter.type';
import imagePlaceholder from '@assets/png/maleImagePlaceholder.png';
import UserCard from 'components/userCard';
import ChangeStatusButton from 'components/changeStatusButton/changeStatusButton';
import ExporterColumnHeads from './exporterColumnHeads';

type IViewExporterDetails = {
  userData: IExporterData;
};
function ViewExporterDetailCard({ userData }: IViewExporterDetails) {
  const { detailAColumnsTitleA, detailAColumnsTitleB } = ExporterColumnHeads();

  return (
    <div className="p-[20px] flex flex-col gap-y-[35px]">
      <div className="flex gap-x-3 items-center">
        <div className="w-[140px] h-[140px] border-[1px] border-[E2E8F0]">
          <img src={imagePlaceholder} alt="imp" className="w-full h-full" />
        </div>
        <div>
          <UserCard
            detailProps={{
              detailKeys: detailAColumnsTitleA,
              incomingData: userData,
            }}
          />
        </div>
      </div>
      <div>
        <p className="font-[600] text-[16px] leading-[20px] text-primary-main">
          Other Details
        </p>
        <div className="w-full bg-[#E2E8F0] border[1px] h-[1px] my-2" />
        <div>
          <UserCard
            detailProps={{
              detailKeys: detailAColumnsTitleB,
              incomingData: userData,
            }}
          />
        </div>
        <div className="w-full bg-[#E2E8F0] border[1px] h-[1px] my-2" />
        <div className="mt-[20px]">
          <ChangeStatusButton
            statusProp={{
              id: userData?.id,
              status: userData?.status,
              userType: userData?.user_type,
              is_active: userData?.is_active,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewExporterDetailCard;
