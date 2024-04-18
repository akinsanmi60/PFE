import { useAuthContext } from '@contexts/authContext';
import { formatDate, getFirstSwordBeforeSpace } from '@utils/constants';
import AppHeader from 'components/appHeader/appHeader';
import { capitalize } from 'lodash';
import DashBboardCounterView from './dashBboardCounterView';
import EmptyBar from '@shared/Table/tableEmpty';
import TableLoading from '@shared/Table/tableLoading';
import CustomTable from '@shared/Table';
import PageContainer from 'components/Layout/PageContainer';
import { GetDasboardOfExporter } from 'services/exporter.service';
import {
  IExporterDashBoardCount,
  IRecentProduceDetail,
} from 'types/farmerAggregatorDash.type';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { ITableHead } from '@shared/Table/table.interface';
import { ExporterPath } from '@utils/paths';
import { useNavigate } from 'react-router-dom';

function ExporterDashboard() {
  const { authUser } = useAuthContext();
  const { data, isLoading } = GetDasboardOfExporter({
    queryParamsId: authUser?.id as string,
  });
  const navigate = useNavigate();

  const first_name = capitalize(
    getFirstSwordBeforeSpace(authUser?.coy_name as unknown as string),
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
            Recent Produce
          </p>
          <p
            className="text-[14px] font-[600] leading-[20px] text-tertiary-light-3 cursor-pointer"
            onClick={() => navigate(`/${ExporterPath.myProduce()}`)}
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

      <DashBboardCounterView
        data={data as IExporterDashBoardCount}
        isLoading={isLoading}
      />

      <PageContainer>
        <CustomTable
          children={renderActionView()}
          tableHeads={tableHead}
          dataTableSource={data?.data?.recent_produce as IRecentProduceDetail[]}
          loading={isLoading}
          tableEmptyState={
            <EmptyBar emptyStateSize="lg" componentType="produce" />
          }
          tableLoader={<TableLoading title="Loading Recent Produce" />}
        />
      </PageContainer>
    </>
  );
}

export default ExporterDashboard;
