import { useAuthContext } from '@contexts/authContext';
import { capitalize, getFirstSwordBeforeSpace } from '@utils/constants';
import PageContainer from 'components/Layout/PageContainer';
import PendingProduce from './component/pendingProduce';
import TodoComponent from './component/todoComponent';

function DashboardHeroFOrFarmerAggregator() {
  const { authUser } = useAuthContext();
  const first_name = capitalize(
    getFirstSwordBeforeSpace(authUser?.full_name as unknown as string),
  );

  return (
    <PageContainer>
      <p className="text-primary-main leading-6 font-[500] text-[18px]">
        Welcome, {first_name}
      </p>
      <div className="grid grid-cols-2 gap-4 xlsm:grid-cols-1 font-primary">
        <div className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg">
          <p className="text-tertiary-light-2 text-[14px] fonnt-[500]">
            My Produces
          </p>
          <p className="text-primary-main text-[30px] font-[600] leading-[42px]">
            0
          </p>
        </div>
        <div className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg">
          <p className="text-tertiary-light-2 text-[14px] fonnt-[500]">
            Pending
          </p>
          <p className="text-primary-main text-[30px] font-[600] leading-[42px]">
            0
          </p>
        </div>
        <div>
          <h3 className="text-primary-main mb-[4px] text-[14px] font-[600]">
            Pending Produces
          </h3>
          <PendingProduce produceValue={{}} />{' '}
        </div>
        <div>
          <h3 className="text-primary-main mb-[4px] text-[14px] font-[600]">
            To Do{' '}
          </h3>
          <TodoComponent />{' '}
        </div>
      </div>
    </PageContainer>
  );
}

export default DashboardHeroFOrFarmerAggregator;
