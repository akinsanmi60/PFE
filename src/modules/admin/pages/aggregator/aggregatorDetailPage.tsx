import TableLoading from '@shared/Table/tableLoading';
import { GET_INDIVIDUAL_AGGREGATOR_URL } from '@utils/apiUrl';
import { adminDashboardPaths, IFarmersAggregatorTab } from '@utils/paths';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import FarmerAggregatorUserDetailPpage from 'components/farmerAggregatorUserDetail';
import ViewActionButtons from 'components/farmerAggregatorUserDetail/viewActionButtons';
import { useParams } from 'react-router-dom';
import { useGetIndividualAggregator } from 'services/individualFarmerAggregator.service';

function AggreggatorDetailPage() {
  const { id, tab, userType } = useParams();
  const currentTab = (tab || 'produces') as IFarmersAggregatorTab;

  const { data, isLoading, isRefetching } = useGetIndividualAggregator({
    queryParamsId: id as string,
    url: GET_INDIVIDUAL_AGGREGATOR_URL,
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
                href: `/${adminDashboardPaths.aggregatorRootPath()}`,
                text: 'Aggregators',
              },
              {
                href: '',
                text: 'Aggregator Detail',
              },
            ]}
          />
        </PageContainer>
      </AppHeader>
      <PageContainer className="pt-0">
        {isLoading || isRefetching ? (
          <div className="w-full bg-primary-white rounded-lg mt-[30px]">
            <TableLoading title="Loading Aggregator Detail" />
          </div>
        ) : (
          <FarmerAggregatorUserDetailPpage
            userDetailProps={{
              id: id as string,
              currentTab: currentTab,
              userType: userType as string,
              userData: data,
              tabsHref: {
                produce: `/${adminDashboardPaths.aggregatorsDetails(
                  id as string,
                  userType as string,
                  'produce',
                )}`,
                transactions: `/${adminDashboardPaths.aggregatorsDetails(
                  id as string,
                  userType as string,
                  'transactions',
                )}`,
                users: `/${adminDashboardPaths.aggregatorsDetails(
                  id as string,
                  userType as string,
                  `users`,
                )}`,
              },
            }}
          />
        )}
      </PageContainer>
    </div>
  );
}

export default AggreggatorDetailPage;
