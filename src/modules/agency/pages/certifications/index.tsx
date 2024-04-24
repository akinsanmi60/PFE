import PageNavTabs from '@shared/PageNavTabs';
import { AgencyUserPath } from '@utils/paths';
import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';
import { Outlet, useLocation } from 'react-router-dom';

function CertificationPage() {
  const { pathname } = useLocation();

  return (
    <div>
      <AppHeader>
        <PageContainer className="pt-0">
          <PageNavTabs
            currentHref={pathname}
            tabs={[
              {
                name: 'Pending',
                href: `/${AgencyUserPath.certifications()}`,
              },
              {
                name: 'Collected',
                href: `/${AgencyUserPath.certificationsTab('collected')}`,
              },
              {
                name: 'Processing',
                href: `/${AgencyUserPath.certificationsTab('processing')}`,
              },
              {
                name: 'Certified',
                href: `/${AgencyUserPath.certificationsTab('certified')}`,
              },
            ]}
          />
        </PageContainer>
      </AppHeader>
      <PageContainer className="pt-0 xlsm:px-3">
        <Outlet />
      </PageContainer>
    </div>
  );
}

export default CertificationPage;
