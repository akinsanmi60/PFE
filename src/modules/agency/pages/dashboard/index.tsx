import AppHeader from 'components/appHeader/appHeader';
import AgencyDashboardHero from './components/agencyDashboardHero';
import { useAuthContext } from '@contexts/authContext';
import { capitalize, formatDate } from '@utils/constants';
import { ITableHead } from '@shared/Table/table.interface';
import PageContainer from 'components/Layout/PageContainer';
import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import TableLoading from '@shared/Table/tableLoading';
import { useNavigate } from 'react-router-dom';
import { agencyPathsLinks } from '@modules/agency/routes';
import StatusBadge, { IStatusType } from '@shared/StatusBadge';

function AgencyDashoard() {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  const tableHead: ITableHead<any>[] = [
    {
      label: 'Business Name',
      accessor: 'pentrar_id',
    },
    {
      label: 'Product Name',
      accessor: 'agency_name',
    },
    {
      label: 'Location',
      accessor: 'phone_number',
    },
    {
      label: 'Last Updated',
      accessor: '',
      render: ({ last_active }) => {
        return formatDate({ date: last_active, time: true });
      },
    },
    {
      label: 'Remarks',
      accessor: 'status',
      render: ({ status }) => {
        const statusText =
          status === 'pending'
            ? 'Incoming'
            : status === 'testing'
            ? 'Processing'
            : status;
        return <StatusBadge status={statusText as IStatusType} />;
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
            onClick={() => navigate(agencyPathsLinks.certifications)}
            className="text-[14px] font-[600] leading-[20px] text-tertiary-light-3 cursor-pointer"
          >
            see all
          </p>
        </div>
      </>
    );
  };

  return (
    <div>
      <AppHeader>
        <p className="text-primary-main leading-6 font-[500] text-[18px] mt-[24px] px-[24px] pb-[14px]">
          Welcome, {capitalize(authUser?.agency_name as unknown as string)}
        </p>
      </AppHeader>
      <AgencyDashboardHero />

      <PageContainer>
        <CustomTable
          children={renderActionView()}
          tableHeads={tableHead}
          dataTableSource={[]}
          tableEmptyState={
            <EmptyBar emptyStateSize="lg" componentType="certifications" />
          }
          tableLoader={<TableLoading title="Loading Recent Certificatons" />}
        />
      </PageContainer>
    </div>
  );
}

export default AgencyDashoard;
