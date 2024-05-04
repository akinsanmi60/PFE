import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';
import ImageUpdate from './components/imageUpdate';
import AgencyPersonalInfo from './components/adminPersonalInfo';
import AgencyChangePassword from './components/changePassword';
import { useGetIndividualSubAdmin } from 'services/admin.service';
import { useAuthContext } from '@contexts/authContext';

function AdminSettingsPage() {
  const { authUser } = useAuthContext();
  const { data } = useGetIndividualSubAdmin(authUser?.id as string);
  return (
    <div>
      <AppHeader />
      <PageContainer className="pt-0 mt-6 ">
        <div className="bg-primary-white rounded-lg p-[24px] ">
          <ImageUpdate />
          <AgencyPersonalInfo data={data} />
          <AgencyChangePassword />
        </div>
      </PageContainer>{' '}
    </div>
  );
}

export default AdminSettingsPage;
