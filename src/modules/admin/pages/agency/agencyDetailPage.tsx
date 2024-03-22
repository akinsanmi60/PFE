import BreadCrumbs from '@shared/BreadCrumbs';
import { AgencyPath, IAgencyTab } from '@utils/paths';
import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';
import { useParams } from 'react-router-dom';
import { useGetIndividualAgency } from 'services/agency.service';
import AgencyViewDetail from './agencyViewDetail';
import TableLoading from '@shared/Table/tableLoading';

function AgencyDetailPage() {
  const { id, tab } = useParams();
  const currentTab = (tab || 'members') as IAgencyTab;

  const { data, isLoading } = useGetIndividualAgency(id as string);

  return (
    <div>
      <AppHeader>
        <PageContainer>
          <BreadCrumbs
            items={[
              {
                href: `/${AgencyPath.root()}`,
                text: 'Agencies',
              },
              {
                href: '',
                text: 'Agency Detail',
              },
            ]}
          />
        </PageContainer>
      </AppHeader>

      <PageContainer>
        {isLoading ? (
          <div className="w-full bg-primary-white rounded-lg mt-[30px]">
            <TableLoading title="Loadiing Agency Details" />
          </div>
        ) : (
          <AgencyViewDetail
            agencyDetailProps={{
              id: id as string,
              currentTab: currentTab,
              userData: data || {},
              tabsHref: {
                members: `/${AgencyPath.agencyDetails(
                  id as string,
                  'members',
                )}`,
                certification: `/${AgencyPath.agencyDetails(
                  id as string,
                  'certification',
                )}`,
              },
            }}
          />
        )}
      </PageContainer>
    </div>
  );
}

export default AgencyDetailPage;
