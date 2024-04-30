import imagePlaceholder from '@assets/png/maleImagePlaceholder.png';
import UserCard from 'components/userCard';

import AgentColumnHeads from './detailColumnHead';
import { IAgencyTeamData } from 'types/agency.type';

function AgentViewCard({ userData }: { userData: IAgencyTeamData }) {
  const { detailAColumnsTitleA, detailAColumnsTitleB } = AgentColumnHeads();

  return (
    <div>
      <div className="flex gap-x-5 items-center xlsm:flex-col xlsm:items-start xlsm:gap-y-[15px]">
        <div className="w-[140px] h-[150px] border-[1px] border-[E2E8F0] xlsm:flex xlsm:justify-center">
          <img src={imagePlaceholder} alt="imp" className="w-full h-full" />
        </div>
        <div className="flex gap-x-[60px] items-center xlsm:flex-col xlsm:items-start xlsm:gap-y-[15px]">
          <div>
            <UserCard
              detailProps={{
                detailKeys: detailAColumnsTitleA,
                incomingData: userData,
              }}
            />
          </div>
          <div>
            <UserCard
              detailProps={{
                detailKeys: detailAColumnsTitleB,
                incomingData: userData,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentViewCard;
