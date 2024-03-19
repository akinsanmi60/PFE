import BreadCrumbs from '@shared/BreadCrumbs';
import TableLoading from '@shared/Table/tableLoading';
import { GET_INDIVIDUAL_AGGREGATOR_URL } from '@utils/apiUrl';
import { AggregatorsPath, IFarmersAggregatorTab } from '@utils/paths';
import PageContainer from 'components/Layout/PageContainer';
import AppHeader from 'components/appHeader/appHeader';
import FarmerAggregatorUserDetailPpage from 'components/userDetail';
import { useParams } from 'react-router-dom';
import { useGetIndividualFarmer } from 'services/individualFarmerAggregator.service';

function AggreggatorDetailPage() {
  const { id, tab, userType } = useParams();
  const currentTab = (tab || 'produces') as IFarmersAggregatorTab;

  const { data, isLoading } = useGetIndividualFarmer({
    queryParamsId: id as string,
    url: GET_INDIVIDUAL_AGGREGATOR_URL,
  });

  return (
    <div>
      <AppHeader>
        <PageContainer>
          <BreadCrumbs
            items={[
              {
                href: `/${AggregatorsPath.root()}`,
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
        {isLoading ? (
          <div className="w-full bg-primary-white rounded-lg mt-[30px]">
            <TableLoading title="Loading Farmers" />
          </div>
        ) : (
          <FarmerAggregatorUserDetailPpage
            userDetailProps={{
              id: id as string,
              currentTab: currentTab,
              userType: userType as string,
              userData: data,
              tabsHref: {
                produces: `/${AggregatorsPath.aggregatorsDetails(
                  id as string,
                  userType as string,
                  'produces',
                )}`,
                transactions: `/${AggregatorsPath.aggregatorsDetails(
                  id as string,
                  userType as string,
                  'transactions',
                )}`,
                users: `/${AggregatorsPath.aggregatorsDetails(
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
