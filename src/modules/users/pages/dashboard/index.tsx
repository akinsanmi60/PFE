import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import { useAuthContext } from '@contexts/authContext';
import { capitalize, getFirstSwordBeforeSpace } from '@utils/constants';
import DashboardHeroFOrFarmerAggregator from 'components/farmerAggregatorHeroCpomponent';
import {
  GET_AGGREGATOR_RECENT_PRODUCE_URL,
  GET_FARMER_RECENT_PRODUCE_URL,
} from '@utils/apiUrl';
import { useGetRecentProduce } from 'services/farmerAggregatorDashboard.service';
import TableLoading from '@shared/Table/tableLoading';

function DashboardHome() {
  const { authUser } = useAuthContext();

  const recentUrl =
    authUser?.role === 'farmer'
      ? GET_FARMER_RECENT_PRODUCE_URL
      : GET_AGGREGATOR_RECENT_PRODUCE_URL;

  const { isLoading, data } = useGetRecentProduce({
    queryParamsId: authUser?.id as string,
    url: recentUrl,
  });

  const first_name = capitalize(
    getFirstSwordBeforeSpace(authUser?.full_name as unknown as string),
  );
  const tableHead = [
    {
      label: 'id',
      accessor: '',
      render: () => null,
    },
    {
      label: 'Produce Name',
      accessor: '',
      render: () => null,
    },
    {
      label: 'Location',
      accessor: '',
      render: () => null,
    },
    {
      label: 'Quantity',
      accessor: '',
      render: () => null,
    },
    {
      label: 'Last Updated',
      accessor: '',
      render: () => null,
    },
    {
      label: 'Action',
      accessor: '',
      render: () => null,
    },
  ];

  return (
    <>
      <AppHeader>
        <p className="text-primary-main leading-6 font-[500] text-[18px] mt-[24px] px-[24px] pb-[14px]">
          Welcome, {first_name}
        </p>
      </AppHeader>

      <DashboardHeroFOrFarmerAggregator
        dashboardProp={{
          id: authUser?.id,
          role: authUser?.role,
        }}
      />

      <PageContainer>
        <div className="w-full bg-primary-white rounded-lg p-[24px]">
          <div className="flex justify-between">
            <p className="text-[14px] font-[600] leading-[20px] text-secondary-light-2">
              Recent Produces
            </p>
            <p className="text-[14px] font-[600] leading-[20px] text-tertiary-light-3 cursor-pointer">
              see all
            </p>
          </div>
          <CustomTable
            tableHeads={tableHead}
            dataTableSource={data?.data || []}
            loading={isLoading}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="produces" />
            }
            tableLoader={<TableLoading title="Loading Recent Produces" />}
          />
        </div>
      </PageContainer>
    </>
  );
}

export default DashboardHome;
