import { USER_LOGIN_URL } from '@utils/apiUrl';
import GeneralLoginPage from './LoginComponent';
import { useParams } from 'react-router-dom';

function FarmerAggregatorLoginPage() {
  const { type } = useParams();
  return (
    <div className="max-content">
      <div className="container">
        {' '}
        <GeneralLoginPage url={USER_LOGIN_URL} pageTitle={type as string} />
      </div>
    </div>
  );
}

export default FarmerAggregatorLoginPage;
