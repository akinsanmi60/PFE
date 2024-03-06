import { useAuthContext } from '@contexts/authContext';
import {
  capitalize,
  getClass,
  getFirstSwordBeforeSpace,
} from '@utils/constants';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as ProfileICon } from '@assets/svg/profileIcon.svg';
import { ReactComponent as DashBell } from '@assets/svg/dashBell.svg';
import { ReactComponent as DashBellRed } from '@assets/svg/dashBellRed.svg';
import { ReactComponent as ChevronDown } from '@assets/svg/chevronDown.svg';
import { logOut } from '@hooks/auth';
import { getToken } from '@hooks/localStorageHook';
import { useNavigate } from 'react-router-dom';

const ProfileBox = ({ first_name }: { first_name: string }) => {
  const { setAuthUser } = useAuthContext();
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    const token = getToken();
    if (!token) {
      setAuthUser(null);
      localStorage.removeItem('presentUrl');
      navigate('/');
    }
  };

  const toggleHoverState = () => {
    if (!isHovered) {
      setIsHovered(true);
      setIsOpen(false);
    } else {
      setIsHovered(false);
      setIsOpen(false);
    }
  };

  const toggleIsOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsHovered(false);
    } else {
      setIsOpen(false);
      setIsHovered(false);
    }
  };

  useEffect(() => {
    const handler = (e: { target: EventTarget | null }) => {
      if (divRef.current && !divRef.current.contains(e.target as HTMLElement)) {
        setIsHovered(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);

  const availableNotification = true;

  return (
    <div className="flex items-center gap-[15px] cursor-pointer">
      <div className="relative" onClick={toggleHoverState} ref={divRef}>
        {availableNotification ? <DashBellRed /> : <DashBell />}

        {isHovered && (
          <div
            className="absolute top-5 -right-14 mt-[23px] cursor-pointer shadow-lg w-[300px] h-[300px] bg-primary-white z-50"
            //   ref={divRef}
          >
            <div className="text-[14px] border-b-[1px] py-[8px] px-[10px] sticky top-0 bg-primary-white z-30 h-[14%]">
              {capitalize(first_name)}, you have notifications!
            </div>
            <div className="h-[86%] overflow-y-auto scrollbar-none">
              {Array(100)
                .fill('notification')
                .map((item, i) => (
                  <div
                    key={i}
                    className="hover:bg-primary-light px-[10px] py-[5px]"
                  >
                    <p>{item}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="">
        <div
          className="flex items-center gap-[10px] relative"
          onClick={toggleIsOpen}
        >
          <ProfileICon />
          <ChevronDown />
        </div>
        {isOpen && (
          <div
            className="absolute top-10 right-2 mt-[18px] cursor-pointer shadow-lg w-[200px] h-[175px] scrollbar-none overflow-y-auto bg-white bg-primary-white z-50"
            //   ref={divRef}
          >
            <div className="" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function AppHeader({ children }: { children: React.ReactNode }) {
  const { authUser } = useAuthContext();

  let first_name: string | undefined;

  if (authUser?.full_name) {
    first_name = capitalize(
      getFirstSwordBeforeSpace(authUser?.full_name as unknown as string),
    );
  }

  const status = 'pending';

  return (
    <div className="sticky top-0 z-30 bg-background-borderlight">
      <div className="bg-primary-white shadow-sm px-[20px] py-[10px]">
        <div className="flex items-center justify-end">
          <div className="flex gap-[30px] items-center">
            <div
              className={`border-[1px] px-[16px] py-[5px] font-[600] rounded-tr-[16px] rounded-br-[16px] rounded-tl-[16px] rounded-bl-[16px] ${getClass(
                status as string,
              )}`}
            >
              <p>
                {status === 'pending'
                  ? 'Pending Verification'
                  : 'Active Account'}
              </p>
            </div>

            <ProfileBox first_name={first_name as string} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default AppHeader;
