import { USER_LOGIN_URL } from '@utils/apiUrl';
import GeneralLoginPage from './LoginComponent';

function FarmerAggregatorLoginPage() {
  return (
    <>
      <GeneralLoginPage url={USER_LOGIN_URL} pageTitle="FarmerAggregator" />;
    </>
  );
}

export default FarmerAggregatorLoginPage;
