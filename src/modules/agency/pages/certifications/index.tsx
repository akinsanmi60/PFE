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
        <PageContainer className="py-0">
          <PageNavTabs
            currentHref={pathname}
            tabs={[
              {
                name: 'Pending',
                href: `/${AgencyUserPath.certifications()}`,
              },
              {
                name: 'Processing',
                href: `/${AgencyUserPath.certificationsProcessing()}`,
              },
            ]}
          />
        </PageContainer>
      </AppHeader>
      CertificationPage
      <Outlet />
    </div>
  );
}

export default CertificationPage;
