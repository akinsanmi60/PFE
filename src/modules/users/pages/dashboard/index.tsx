import PageContainer from 'components/Layout/PageContainer';
import DashboardHeroFOrFarmerAggregator from 'components/farmerAggregatorHeroCpomponent';

function DashboardHome() {
  return (
    <div>
      <DashboardHeroFOrFarmerAggregator />

      <PageContainer>
        <div className="w-full bg-primary-white rounded-lg p-[24px]">
          <div className="flex justify-between">
            <p className="text-[14px] font-[600] leading-[20px]">
              Recent Produces
            </p>
            <p>see all</p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default DashboardHome;
