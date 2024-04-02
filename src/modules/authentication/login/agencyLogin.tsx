import { AGENCY_LOGIN_URL } from '@utils/apiUrl';
import GeneralLoginPage from './LoginComponent';

function AgencyLoginPage() {
  return (
    <div className="max-content">
      <div className="container">
        <GeneralLoginPage url={AGENCY_LOGIN_URL} pageTitle="Agency" />;
      </div>
    </div>
  );
}

export default AgencyLoginPage;
