import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';
import ImageUpdate from './components/imageUpdate';
import AgentPersonalInfo from './components/agentPersonalInfo';
import { useAuthContext } from '@contexts/authContext';
import AgencyChangePassword from './components/changePassword';
import { Account } from '@utils/constants';
import AgencyPersonalInfo from './components/agencyInfo';

function Settings() {
  const { authUser } = useAuthContext();
  return (
    <div>
      <AppHeader />

      <PageContainer className="pt-0 mt-6 ">
        <div className="bg-primary-white rounded-lg p-[24px] ">
          <ImageUpdate />
          {(authUser?.role === Account['Agency Admin'] ||
            authUser?.role === Account['Agency Staff']) && (
            <AgentPersonalInfo />
          )}
          {authUser?.role === Account.Agency && <AgencyPersonalInfo />}
          <AgencyChangePassword />
        </div>
      </PageContainer>
    </div>
  );
}

export default Settings;
