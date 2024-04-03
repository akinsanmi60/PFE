import PageNavTabs from '@shared/PageNavTabs';
import { ExporterPath } from '@utils/paths';
import AppHeader from 'components/appHeader/appHeader';

import PageContainer from 'components/Layout/PageContainer';
import { Outlet, useLocation } from 'react-router-dom';

function ExporterTransfers() {
  const { pathname } = useLocation();

  return (
    <div>
      <AppHeader>
        <PageContainer className="pt-0">
          <PageNavTabs
            currentHref={pathname}
            tabs={[
              {
                name: 'Transfer Sent',
                href: `/${ExporterPath.myTransfers()}`,
              },
              {
                name: 'Transfer From',
                href: `/${ExporterPath.fromTransfer()}`,
              },
            ]}
          />
        </PageContainer>
      </AppHeader>
      <PageContainer className="pt-0">
        <Outlet />
      </PageContainer>
    </div>
  );
}

export default ExporterTransfers;
