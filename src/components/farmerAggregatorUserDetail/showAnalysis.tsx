import {
  GET_AGGREGATOR_DASHBOARD_COUNT_URL,
  GET_FARMER_DASHBOARD_COUNT_URL,
} from '@utils/apiUrl';
import { GetDasboardOfFarmerAggregator } from 'services/farmerAggregatorDashboard.service';
import ShowDashboard from './showDashboard';
import PageNavTabs from '@shared/PageNavTabs';
import { IFarmersAggregatorTab } from '@utils/paths';
import FarmerAggregatorProduce from './producesTableSummary';
import FarmerAggregatorTransaction from './transactionTableSummary';

type IShowAnalysis = {
  showAnalysisProp: {
    role: string;
    id: string;
    currentTab: string;
    tabsHref: Record<IFarmersAggregatorTab, string>;
  };
};

function ShowAnalysis({ showAnalysisProp }: IShowAnalysis) {
  const urlForCount =
    showAnalysisProp?.role === 'farmer'
      ? GET_FARMER_DASHBOARD_COUNT_URL
      : GET_AGGREGATOR_DASHBOARD_COUNT_URL;

  const { data, isLoading } = GetDasboardOfFarmerAggregator({
    queryParamsId: showAnalysisProp.id as string,
    url: urlForCount,
  });

  const tabs = [
    {
      href: showAnalysisProp.tabsHref.produce,
      name: 'Produce',
    },
    {
      href: showAnalysisProp.tabsHref.transactions,
      name: 'Transactions',
    },
  ];

  return (
    <div className="p-[20px]">
      <div className="mb-4">
        <ShowDashboard dashboardProp={{ isLoading: isLoading, data: data }} />
      </div>

      <PageNavTabs currentHref={showAnalysisProp.currentTab} tabs={tabs} />
      <div className="w-full bg-[#E2E8F0] border[1px] h-[1px]" />

      {showAnalysisProp.currentTab === 'produce' && (
        <FarmerAggregatorProduce
          fetcherProp={{
            id: showAnalysisProp?.id,
            role: showAnalysisProp?.role,
          }}
        />
      )}

      {showAnalysisProp.currentTab === 'transactions' && (
        <FarmerAggregatorTransaction />
      )}
    </div>
  );
}

export default ShowAnalysis;
