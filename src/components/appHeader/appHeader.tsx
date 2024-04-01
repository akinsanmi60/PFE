import { useAuthContext } from '@contexts/authContext';
import {
  Account,
  capitalize,
  getClass,
  getFirstSwordBeforeSpace,
} from '@utils/constants';

import { logOut } from '@hooks/auth';
// import { getToken } from '@hooks/localStorageHook';
import { useNavigate } from 'react-router-dom';
import { webPaths } from '@utils/paths';
import ProfileHead from './profileHead';
import NotificationHead from './notificationHead';

const ProfileBox = ({ first_name }: { first_name: string }) => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  // const token = getToken();

  const handleLogout = () => {
    logOut();
    // if (token) {
    setAuthUser(null);
    localStorage.removeItem('presentUrl');
    navigate(`${webPaths.home()}`);
    // }
  };

  const availableNotification = true;

  return (
    <div className="flex items-center gap-[15px] cursor-pointer">
      <NotificationHead
        availableNotification={availableNotification}
        first_name={first_name}
      />

      <ProfileHead handleLogout={handleLogout} />
    </div>
  );
};

function AppHeader({ children }: { children?: React.ReactNode }) {
  const { authUser } = useAuthContext();

  let first_name: string | undefined;

  if (authUser?.full_name) {
    first_name = capitalize(
      getFirstSwordBeforeSpace(authUser?.full_name as unknown as string),
    );
  } else if (authUser?.coy_name) {
    first_name = capitalize(
      getFirstSwordBeforeSpace(authUser?.coy_name as unknown as string),
    );
  }

  return (
    <div className="sticky top-0 z-30 bg-background-borderlight">
      <div className="bg-primary-white shadow-sm px-[20px] py-[10px]">
        <div className="flex items-center justify-end">
          <div className="flex gap-[30px] items-center">
            {authUser?.role === Account.Admin ? null : (
              <div
                className={`border-[1px] px-[16px] py-[5px] font-[600] rounded-tr-[16px] rounded-br-[16px] rounded-tl-[16px] rounded-bl-[16px] ${getClass(
                  authUser?.status as string,
                )}`}
              >
                <p>
                  {authUser?.status === 'pending'
                    ? 'Pending Verification'
                    : authUser?.status === 'active'
                    ? 'Active Account'
                    : 'Inactive Account'}
                </p>
              </div>
            )}

            <ProfileBox first_name={first_name as string} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default AppHeader;
