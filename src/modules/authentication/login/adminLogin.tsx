import { ADMIN_LOGIN_URL } from '@utils/apiUrl';
import GeneralLoginPage from './LoginComponent';

function AdminLoginPage() {
  return (
    <div className="max-content">
      <div className="container">
        <GeneralLoginPage url={ADMIN_LOGIN_URL} pageTitle="Admin" />
      </div>
    </div>
  );
}

export default AdminLoginPage;
