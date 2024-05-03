import AppHeader from 'components/appHeader/appHeader';
import PageContainer from 'components/Layout/PageContainer';
import ImageUpdate from './components/imageUpdate';
import AgencyPersonalInfo from './components/agencyPersonalInfo';
import { useGetIndividualTeamMember } from 'services/agency.service';
import { useGetIdForFetch } from 'services/auth.service';
import { useAuthContext } from '@contexts/authContext';

function Settings() {
  const { authUser } = useAuthContext();
  const { idFOrFetch } = useGetIdForFetch();
  const { data } = useGetIndividualTeamMember(
    authUser?.id as string,
    idFOrFetch as string,
  );
  return (
    <div>
      <AppHeader />

      <PageContainer className="pt-0 mt-6 ">
        <div className="bg-primary-white rounded-lg p-[24px] ">
          <ImageUpdate />
          <AgencyPersonalInfo data={data} />
        </div>
      </PageContainer>
    </div>
  );
}

export default Settings;
