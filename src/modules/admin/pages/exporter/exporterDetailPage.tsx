import BreadCrumbs from '@shared/BreadCrumbs';
import TableLoading from '@shared/Table/tableLoading';
import { adminDashboardPaths } from '@utils/paths';
import AppHeader from 'components/appHeader/appHeader';
import ViewExporterDetails from 'components/exporterDetail/exporterViewDetails';
import PageContainer from 'components/Layout/PageContainer';
import { useParams } from 'react-router-dom';
import { useGetIndividualExporter } from 'services/exporter.service';
import { IExporterData } from 'types/exporter.type';

function ExporterDetailPage() {
  const { id, tab, userType } = useParams();

  const { data, isLoading, isRefetching } = useGetIndividualExporter(
    id as string,
  );

  return (
    <div>
      <AppHeader>
        <PageContainer>
          <BreadCrumbs
            items={[
              {
                href: `/${adminDashboardPaths.exporterRootPath()}`,
                text: 'Exporters',
              },
              {
                href: '',
                text: 'Exporter Detail',
              },
            ]}
          />
        </PageContainer>
      </AppHeader>

      <PageContainer>
        {isLoading || isRefetching ? (
          <div className="w-full bg-primary-white rounded-lg mt-[30px]">
            <TableLoading title="Loading Farmers" className="h-screen" />
          </div>
        ) : (
          <ViewExporterDetails
            exportDetailProps={{
              id: id as string,
              currentTab: tab as string,
              userData: data?.data as IExporterData,
              tabsHref: {
                produce: `/${adminDashboardPaths.exportersDetails(
                  id as string,
                  userType as string,
                  'produce',
                )}`,
                orders: `/${adminDashboardPaths.exportersDetails(
                  id as string,
                  userType as string,
                  'orders',
                )}`,
                certifications: `/${adminDashboardPaths.exportersDetails(
                  id as string,
                  userType as string,
                  'certifications',
                )}`,
                transactions: `/${adminDashboardPaths.exportersDetails(
                  id as string,
                  userType as string,
                  'transactions',
                )}`,
              },
            }}
          />
        )}
      </PageContainer>
    </div>
  );
}

export default ExporterDetailPage;
