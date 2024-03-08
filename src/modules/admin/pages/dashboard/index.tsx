import { useAuthContext } from '@contexts/authContext';
import { capitalize, getFirstSwordBeforeSpace } from '@utils/constants';
import AppHeader from 'components/appHeader/appHeader';

function AdminDashboard() {
  const { authUser } = useAuthContext();

  const first_name = capitalize(
    getFirstSwordBeforeSpace(authUser?.full_name as unknown as string),
  );

  return (
    <div>
      <AppHeader>
        <p className="text-primary-main leading-6 font-[500] text-[18px] mt-[24px] px-[24px] pb-[14px]">
          Welcome, {first_name}
        </p>
      </AppHeader>
    </div>
  );
}

export default AdminDashboard;
