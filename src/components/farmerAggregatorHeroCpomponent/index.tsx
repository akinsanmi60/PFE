import PageContainer from 'components/Layout/PageContainer';
import PendingProduce from './component/pendingProduce';
import TodoComponent from './component/todoComponent';
import {
  GET_AGGREGATOR_DASHBOARD_COUNT_URL,
  GET_FARMER_DASHBOARD_COUNT_URL,
} from '@utils/apiUrl';
import CircularProgress from '@shared/CircularProgress';
import { IDashboardHeroFOrFarmerAggregator } from 'types/farmerAggregatorDash.type';
import { GetDasboardOfFarmerAggregator } from 'services/farmerAggregatorDashboard.service';

function DashboardHeroFOrFarmerAggregator({
  dashboardProp,
}: IDashboardHeroFOrFarmerAggregator) {
  const { id, role, userStatus } = dashboardProp;

  const urlForCount =
    role === 'farmer'
      ? GET_FARMER_DASHBOARD_COUNT_URL
      : GET_AGGREGATOR_DASHBOARD_COUNT_URL;

  const { data, isLoading } = GetDasboardOfFarmerAggregator({
    queryParamsId: id as string,
    url: urlForCount,
  });

  return (
    <PageContainer>
      <div className="grid grid-cols-2 gap-4 sixm:grid-cols-1 font-primary">
        <div className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]">
          <p className="text-tertiary-light-2 text-[14px] font-[500]">
            My Produces
          </p>
          <p className="text-primary-main text-[30px] font-[600] leading-[42px]">
            {isLoading ? (
              <CircularProgress color="#072723" size={30} />
            ) : (
              data?.data?.counted_produce || 0
            )}
          </p>
        </div>
        <div className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]">
          <p className="text-tertiary-light-2 text-[14px] font-[500]">
            Pending
          </p>
          <p className="text-primary-main text-[30px] font-[600] leading-[42px]">
            {isLoading ? (
              <CircularProgress color="#072723" size={30} />
            ) : (
              data?.data?.pending_produce || 0
            )}
          </p>
        </div>
        <div>
          <h3 className="text-primary-main mb-[4px] text-[14px] font-[600]">
            Pending Produces
          </h3>
          <PendingProduce
            produceValue={{
              produceDetail: data?.data?.detail_pending_produce,
              loading: isLoading,
            }}
          />{' '}
        </div>
        {userStatus === 'pending' && (
          <div>
            <h3 className="text-primary-main mb-[4px] text-[14px] font-[600]">
              To Do{' '}
            </h3>
            <TodoComponent />{' '}
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default DashboardHeroFOrFarmerAggregator;
