import { USER_LOGIN_URL } from '@utils/apiUrl';
import GeneralLoginPage from './LoginComponent';

function FarmerAggregatorLoginPage() {
  return (
    <div className="max-content">
      <div className="container">
        {' '}
        <GeneralLoginPage url={USER_LOGIN_URL} pageTitle="FarmerAggregator" />;
      </div>
    </div>
  );
}

export default FarmerAggregatorLoginPage;
