import PageNavTabs from '@shared/PageNavTabs';
import { FarmerAggregatorPath } from '@utils/paths';
import AppHeader from 'components/appHeader/appHeader';

import PageContainer from 'components/Layout/PageContainer';
import { Outlet, useLocation } from 'react-router-dom';

function UserTransfers() {
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
                href: `/${FarmerAggregatorPath.myTransfers()}`,
              },
              {
                name: 'Transfer From',
                href: `/${FarmerAggregatorPath.fromTransfer()}`,
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

export default UserTransfers;
