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
import StatusBadge, { IStatusType } from '@shared/StatusBadge';
import { useGetAllCertification } from 'services/certification.service';
import { ICertification } from 'types/certification.type';
import { AgencyUserPath } from '@utils/paths';

function AgencyDashoard() {
  const { authUser } = useAuthContext();
  const idFOrFetch =
    authUser?.agency_attached_to !== null
      ? authUser?.agency_attached_to
      : authUser?.id;

  const navigate = useNavigate();
  const queryParams = {
    page: 1,
    limit: 10,
    agency_to: idFOrFetch as string,
  };

  const { data, isLoading, isRefetching } = useGetAllCertification(queryParams);

  const tableHead: ITableHead<ICertification>[] = [
    {
      label: 'Certification ID',
      accessor: '',
      render: ({ certification_id }) => certification_id,
    },
    {
      label: 'Exporter Name',
      accessor: '',
      render: ({ exporter_name }) => capitalize(exporter_name as string),
    },
    {
      label: 'Produce Name',
      accessor: '',
      render: ({ produce: { name } }) => {
        return capitalize(name);
      },
    },
    {
      label: 'Produce Location',
      accessor: '',
      render: ({ export: { coy_state } }) => {
        return capitalize(coy_state as string);
      },
    },
    {
      label: 'Created Date',
      accessor: '',
      render: ({ created_at }) => {
        return !created_at
          ? '--'
          : formatDate({ date: created_at as string, time: true });
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
            onClick={() => navigate(`/${AgencyUserPath.certifications()}`)}
            className="text-[14px] font-[600] leading-[20px] text-tertiary-light-3 cursor-pointer"
          >
            see all
          </p>
        </div>
      </>
    );
  };

  const displayName =
    authUser?.agency_name !== null
      ? authUser?.agency_name
      : authUser?.full_name;

  return (
    <div>
      <AppHeader>
        <p className="text-primary-main leading-6 font-[500] text-[18px] mt-[24px] px-[24px] pb-[14px]">
          Welcome, {capitalize(displayName as unknown as string)}
        </p>
      </AppHeader>
      <AgencyDashboardHero />

      <PageContainer>
        <CustomTable
          children={renderActionView()}
          tableHeads={tableHead}
          loading={isLoading || isRefetching}
          dataTableSource={data?.certifications || []}
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
