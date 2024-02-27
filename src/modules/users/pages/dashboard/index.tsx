import CustomTable from '@shared/Table';
import EmptyBar from '@shared/Table/tableEmpty';
import PageContainer from 'components/Layout/PageContainer';
import DashboardHeroFOrFarmerAggregator from 'components/farmerAggregatorHeroCpomponent';

function DashboardHome() {
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
    <div>
      <DashboardHeroFOrFarmerAggregator />

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
            dataTableSource={[]}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="produces" />
            }
          />
        </div>
      </PageContainer>
    </div>
  );
}

export default DashboardHome;
