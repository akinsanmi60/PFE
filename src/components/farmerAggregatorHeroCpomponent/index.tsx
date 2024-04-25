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
import {
  useGetIndividualAggregatorDependent,
  useGetIndividualFarmerDependent,
} from 'services/individualFarmerAggregator.service';
import { useAuthContext } from '@contexts/authContext';

function DashboardHeroFOrFarmerAggregator({
  dashboardProp,
}: IDashboardHeroFOrFarmerAggregator) {
  const { id, role } = dashboardProp;
  const { authUser } = useAuthContext();

  const urlForCount =
    role === 'farmer'
      ? GET_FARMER_DASHBOARD_COUNT_URL
      : GET_AGGREGATOR_DASHBOARD_COUNT_URL;

  const { data, isLoading } = GetDasboardOfFarmerAggregator({
    queryParamsId: id as string,
    url: urlForCount,
  });

  const { data: individualAggregator } = useGetIndividualAggregatorDependent();
  const { data: individualFarmer } = useGetIndividualFarmerDependent();

  const currentUserStatus = () => {
    switch (authUser?.role) {
      case 'farmer':
        return individualFarmer?.user_update_submited;
      case 'aggregator':
        return individualAggregator?.user_update_submited;
    }
  };

  return (
    <PageContainer className="xlsm:px-3">
      <div className="grid grid-cols-2 gap-4 sixm:grid-cols-1 font-primary">
        <div className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]">
          <p className="text-tertiary-light-2 text-[14px] font-[500]">
            My Produce
          </p>
          <p className="text-secondary-light-1 text-[30px] font-[600] leading-[42px]">
            {isLoading ? (
              <CircularProgress color="#2AA232" size={30} />
            ) : (
              data?.data?.counted_produce || 0
            )}
          </p>
        </div>
        <div className="bg-primary-white px-[24px] py-[15px] flex flex-col gap-y-[15px] rounded-lg h-[112px]">
          <p className="text-tertiary-light-2 text-[14px] font-[500]">
            Pending
          </p>
          <p className="text-secondary-light-1 text-[30px] font-[600] leading-[42px]">
            {isLoading ? (
              <CircularProgress color="#2AA232" size={30} />
            ) : (
              data?.data?.pending_produce || 0
            )}
          </p>
        </div>
        <div>
          <h3 className="text-primary-main mb-[4px] text-[14px] font-[600]">
            Pending Produce
          </h3>
          <PendingProduce
            produceValue={{
              produceDetail: data?.data?.detail_pending_produce,
              loading: isLoading,
            }}
          />{' '}
        </div>
        {currentUserStatus() === false && (
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
