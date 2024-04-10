import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import { useAuthContext } from '@contexts/authContext';
import {
  capitalize,
  formatDate,
  getFirstSwordBeforeSpace,
} from '@utils/constants';
import DashboardHeroFOrFarmerAggregator from 'components/farmerAggregatorHeroCpomponent';
import {
  GET_AGGREGATOR_RECENT_PRODUCE_URL,
  GET_FARMER_RECENT_PRODUCE_URL,
} from '@utils/apiUrl';
import { useGetRecentProduce } from 'services/farmerAggregatorDashboard.service';
import TableLoading from '@shared/Table/tableLoading';
import { ITableHead } from '@shared/Table/table.interface';
import { IRecentProduceDetail } from 'types/farmerAggregatorDash.type';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { useNavigate } from 'react-router-dom';

function DashboardHome() {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

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
  const tableHead: ITableHead<IRecentProduceDetail>[] = [
    {
      label: 'id',
      accessor: '',
      render: ({ pentrar_produce_id }) => pentrar_produce_id,
    },
    {
      label: 'Produce Name',
      accessor: 'name',
      render: ({ name }) => name,
    },
    {
      label: 'Location',
      accessor: 'farm_state',
      render: ({ farm_state }) => farm_state,
    },
    {
      label: 'Quantity',
      accessor: 'quantity',
      render: ({ quantity, unit }) =>
        `${quantity === null ? 0 : quantity}/${
          unit === null || unit === '' ? 'KG' : unit
        }`,
    },
    {
      label: 'Last Updated',
      accessor: '',
      render: ({ updated_at }) => {
        return formatDate({ date: updated_at });
      },
    },
    {
      label: 'Status',
      accessor: 'status',
      render: ({ status }) => {
        return <StatusBadge status={status as IStatusType} />;
      },
    },
  ];

  const renderActionView = () => {
    return (
      <>
        <div className="flex justify-between mb-5">
          <p className="text-[14px] font-[600] leading-[20px] text-secondary-light-2">
            Recent Produces
          </p>
          <p
            onClick={() => navigate('/pentrar/user/my-produce')}
            className="text-[14px] font-[600] leading-[20px] text-tertiary-light-3 cursor-pointer"
          >
            see all
          </p>
        </div>
      </>
    );
  };

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
          userStatus: authUser?.status,
        }}
      />

      <PageContainer>
        <CustomTable<IRecentProduceDetail>
          children={renderActionView()}
          tableHeads={tableHead}
          dataTableSource={data?.data || []}
          loading={isLoading}
          tableEmptyState={
            <EmptyBar emptyStateSize="lg" componentType="produces" />
          }
          tableLoader={<TableLoading title="Loading Recent Produces" />}
        />
      </PageContainer>
    </>
  );
}

export default DashboardHome;
