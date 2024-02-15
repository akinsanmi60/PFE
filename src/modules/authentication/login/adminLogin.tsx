import { ADMIN_LOGIN_URL } from '@utils/apiUrl';
import GeneralLoginPage from './LoginComponent';

function AdminLoginPage() {
  return (
    <>
      <GeneralLoginPage url={ADMIN_LOGIN_URL} pageTitle="Admin" />
    </>
  );
}

export default AdminLoginPage;
