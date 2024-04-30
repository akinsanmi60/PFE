import EmptyBar from '@shared/Table/tableEmpty';
import TableLoading from '@shared/Table/tableLoading';
import { GET_INDIVIDUAL_FARMER_URL } from '@utils/apiUrl';
import { adminDashboardPaths, IFarmersAggregatorTab } from '@utils/paths';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import FarmerAggregatorUserDetailPpage from 'components/farmerAggregatorUserDetail';
import ViewActionButtons from 'components/farmerAggregatorUserDetail/viewActionButtons';
import { useParams } from 'react-router-dom';
import { useGetIndividualFarmer } from 'services/individualFarmerAggregator.service';

function FarmerDetailPage() {
  const { id, tab, userType } = useParams();
  const currentTab = (tab || 'produces') as IFarmersAggregatorTab;

  const { data, isLoading, isRefetching } = useGetIndividualFarmer({
    queryParamsId: id as string,
    url: GET_INDIVIDUAL_FARMER_URL,
  });

  return (
    <div>
      <AppHeader>
        <PageContainer>
          <ViewActionButtons
            id={id as string}
            userType={userType as string}
            status={data?.status}
            items={[
              {
                href: `/${adminDashboardPaths.farmerRootPath()}`,
                text: 'Farmers',
              },
              {
                href: '',
                text: 'Farmer Detail',
              },
            ]}
          />
        </PageContainer>
      </AppHeader>
      <PageContainer className="pt-0">
        {isLoading || isRefetching ? (
          <div className="w-full bg-primary-white rounded-lg mt-[30px]">
            <TableLoading title="Loading Farmers" className="h-screen" />
          </div>
        ) : data ? (
          <FarmerAggregatorUserDetailPpage
            userDetailProps={{
              id: id as string,
              currentTab: currentTab,
              userType: userType as string,
              userData: data,
              tabsHref: {
                produce: `/${adminDashboardPaths.farmersDetails(
                  id as string,
                  userType as string,
                  'produce',
                )}`,
                transactions: `/${adminDashboardPaths.farmersDetails(
                  id as string,
                  userType as string,
                  'transactions',
                )}`,
                users: `/${adminDashboardPaths.farmersDetails(
                  id as string,
                  userType as string,
                  `users`,
                )}`,
              },
            }}
          />
        ) : !data && !isLoading && !isRefetching ? (
          <div className="w-full bg-primary-white rounded-lg mt-[30px]">
            <EmptyBar />
          </div>
        ) : null}
      </PageContainer>
    </div>
  );
}

export default FarmerDetailPage;
