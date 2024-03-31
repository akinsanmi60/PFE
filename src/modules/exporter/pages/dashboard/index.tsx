import { useAuthContext } from '@contexts/authContext';
import { getFirstSwordBeforeSpace } from '@utils/constants';
import AppHeader from 'components/appHeader/appHeader';
import { capitalize } from 'lodash';
import DashBboardCounterView from './dashBboardCounterView';
import EmptyBar from '@shared/Table/tableEmpty';
import TableLoading from '@shared/Table/tableLoading';
import CustomTable from '@shared/Table';
import PageContainer from 'components/Layout/PageContainer';

function ExporterDashboard() {
  const { authUser } = useAuthContext();

  const first_name = capitalize(
    getFirstSwordBeforeSpace(authUser?.coy_name as unknown as string),
  );

  const renderActionView = () => {
    return (
      <>
        <div className="flex justify-between mb-5">
          <p className="text-[14px] font-[600] leading-[20px] text-secondary-light-2">
            Recent Produces
          </p>
          <p className="text-[14px] font-[600] leading-[20px] text-tertiary-light-3 cursor-pointer">
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

      <DashBboardCounterView />

      <PageContainer>
        <CustomTable
          children={renderActionView()}
          tableHeads={[]}
          dataTableSource={[]}
          loading={false}
          tableEmptyState={
            <EmptyBar emptyStateSize="lg" componentType="produces" />
          }
          tableLoader={<TableLoading title="Loading Recent Produces" />}
        />
      </PageContainer>
    </>
  );
}

export default ExporterDashboard;
