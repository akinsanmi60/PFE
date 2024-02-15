import { USER_LOGIN_URL } from '@utils/apiUrl';
import GeneralLoginPage from './LoginComponent';

function AgencyLoginPage() {
  return (
    <>
      <GeneralLoginPage url={USER_LOGIN_URL} pageTitle="Agency" />;
    </>
  );
}

export default AgencyLoginPage;
