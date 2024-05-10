import PageNavTabs from '@shared/PageNavTabs';
import { IExporterTab } from '@utils/paths';
import ShowExporterDashboard from './showExportDashboard';
import { GetDasboardOfExporter } from 'services/exporter.service';
import ExporterProduce from './producesTableSummary';
import ExporterTransaction from './transactionTableSummary';
import ExporterCertificationTableSummary from './certificationTableSummary';
import ExporterOrderTableSummary from './orderTableSummary';

type IShowAnalysis = {
  showAnalysisProp: {
    role: string;
    id: string;
    currentTab: string;
    tabsHref: Record<IExporterTab, string>;
  };
};

function ShowExporterAnalysis({ showAnalysisProp }: IShowAnalysis) {
  const { data, isLoading } = GetDasboardOfExporter({
    queryParamsId: showAnalysisProp.id as string,
  });

  const tabs = [
    {
      href: showAnalysisProp.tabsHref.produce,
      name: 'Produce',
    },
    {
      href: showAnalysisProp.tabsHref.certifications,
      name: 'Certifications',
    },
    {
      href: showAnalysisProp.tabsHref.orders,
      name: 'Orders',
    },
    {
      href: showAnalysisProp.tabsHref.transactions,
      name: 'Transactions',
    },
  ];

  return (
    <div className="p-[20px]">
      <div className="mb-4">
        <ShowExporterDashboard
          dashboardProp={{ isLoading: isLoading, data: data?.data }}
        />
      </div>

      <PageNavTabs currentHref={showAnalysisProp.currentTab} tabs={tabs} />
      <div className="w-full bg-[#E2E8F0] border[1px] h-[1px]" />

      {showAnalysisProp.currentTab === 'produce' && (
        <ExporterProduce
          fetcherProp={{
            id: showAnalysisProp?.id,
            role: showAnalysisProp?.role,
          }}
        />
      )}

      {showAnalysisProp.currentTab === 'transactions' && (
        <ExporterTransaction />
      )}

      {showAnalysisProp.currentTab === 'certifications' && (
        <ExporterCertificationTableSummary userId={showAnalysisProp.id} />
      )}

      {showAnalysisProp.currentTab === 'orders' && (
        <ExporterOrderTableSummary />
      )}
    </div>
  );
}

export default ShowExporterAnalysis;
