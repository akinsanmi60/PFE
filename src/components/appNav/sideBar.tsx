import { NavLink, useLocation } from 'react-router-dom';
import { useAuthContext } from '@contexts/authContext';
import {
  Account,
  capitalize,
  getFirstSwordBeforeSpace,
} from '@utils/constants';
import {
  ADMIN_SETTINGS_SIDENAV,
  AGENCY_SIDENAV,
  AGGREGATOR_SIDENAV,
  EXPORTER_SIDENAV,
  SETTINGS_SIDENAV,
  SUBADMIN_SETTINGS,
  SUPER_ADMIN_SIDENAV,
} from '@utils/sideNaDetailsv';
import pentrarLogo from '@assets/svg/LogoPentrar.svg';
import { ReactComponent as ProfileICon } from '@assets/svg/profileIcon.svg';

import { useMemo } from 'react';

const active = ({ isActive }: { isActive: boolean }) => {
  return {
    fill: isActive ? '#0000FF' : 'white',
    border: isActive ? '2px solid white' : 'white',
    borderRadius: '8px',
    background: isActive ? '#2AA232' : 'transparent',
  };
};

function SideNav() {
  const location = useLocation();
  const pathName = location.pathname.split('/')[3];
  const { authUser } = useAuthContext();

  const navList = useMemo(() => {
    return authUser?.role === Account.Aggregator ||
      authUser?.role === Account.Farmer
      ? AGGREGATOR_SIDENAV
      : authUser?.role === Account.Exporter
      ? EXPORTER_SIDENAV
      : authUser?.role === Account.Admin || authUser?.role === Account.SubAdmin
      ? SUPER_ADMIN_SIDENAV
      : authUser?.role === Account.Agency
      ? AGENCY_SIDENAV
      : null;
  }, [authUser?.role]);

  let first_name: string | undefined;

  if (authUser?.full_name) {
    first_name = capitalize(
      getFirstSwordBeforeSpace(authUser?.full_name as unknown as string),
    );
  }

  const settingsNavLink = useMemo(() => {
    return authUser?.role === Account.Aggregator ||
      authUser?.role === Account.Farmer
      ? SETTINGS_SIDENAV
      : authUser?.role === Account.Exporter
      ? null
      : authUser?.role === Account.Admin
      ? ADMIN_SETTINGS_SIDENAV
      : authUser?.role === Account.SubAdmin
      ? SUBADMIN_SETTINGS
      : null;
  }, [authUser?.role]);

  return (
    <div className="bg-[#F4FAF5] text-[#999999] flex flex-col justify-between border-r-2 border-[#F7F7F8] h-screen">
      <div className="mt-[13px]  px-4">
        <div className="h-[4rem] py-[8px]">
          <img src={pentrarLogo} alt="peoplelogo" className="h-[40px]" />
        </div>
        <div className="flex flex-col gap-2">
          {navList?.map(sidenav => {
            const checkPath = pathName === sidenav.path;
            return (
              <div
                className={
                  checkPath ? 'text-[14px] text-primary-white' : 'text-[14px]'
                }
                key={sidenav.name}
              >
                <NavLink
                  className={
                    checkPath
                      ? 'text-[18px] font-[400] h-[40px] active:font-[400]  flex items-center gap-3 px-3 py-[25px]'
                      : 'text-[18px] font-[400] h-[40px] active:font-[400]  flex items-center gap-3 px-3'
                  }
                  to={sidenav.path}
                  key={sidenav.name}
                  style={active}
                  role={sidenav.name}
                >
                  <span className={checkPath ? '-ml-[2px]' : 'ml-0'}>
                    {checkPath ? sidenav.IconBlue : sidenav.Icon}
                  </span>

                  <span>{sidenav.name}</span>
                </NavLink>
              </div>
            );
          })}
        </div>

        {/* Settings */}
        {settingsNavLink && (
          <div className="mt-[20px]">
            <div className="w-full bg-background-borderlight border[1px] h-[1px]" />
            <p className="p-4 text-primary-light text-[12px] font-primary">
              Settings
            </p>
            <div className="flex flex-col gap-2">
              {settingsNavLink?.map(sidenav => {
                const checkPath = pathName === sidenav.path;
                return (
                  <div
                    className={
                      checkPath
                        ? 'text-[14px] text-primary-white'
                        : 'text-[14px]'
                    }
                    key={sidenav.name}
                  >
                    <NavLink
                      className={
                        checkPath
                          ? 'text-[18px] font-[400] h-[40px] active:font-[400]  flex items-center gap-3 px-3 py-[25px]'
                          : 'text-[18px] font-[400] h-[40px] active:font-[400]  flex items-center gap-3 px-3'
                      }
                      to={sidenav.path}
                      key={sidenav.name}
                      style={active}
                      role={sidenav.name}
                    >
                      <span className={checkPath ? '-ml-[2px]' : 'ml-0'}>
                        {checkPath ? sidenav.IconBlue : sidenav.Icon}
                      </span>

                      <span>{sidenav.name}</span>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="w-full bg-[#E2E8F0] border[1px] h-[1px]" />
        <div className="flex px-4  text-primary-light items-center">
          <ProfileICon />
          <div className="flex flex-col px-4 py-4 text-primary-light">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-[600]">{capitalize(first_name)}</p>
            </div>
            <p className="text-[14px] font-[400] whitespace-nowrap">
              {capitalize(authUser?.role)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
