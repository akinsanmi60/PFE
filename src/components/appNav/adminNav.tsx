import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { useAuthContext } from '@contexts/authContext';
import {
  Account,
  capitalize,
  getFirstSwordBeforeSpace,
} from '@utils/constants';
import { logOut } from '@hooks/auth';
import { AGGREGATOR_SIDENAV, EXPORTER_SIDENAV } from '@utils/sideNaDetailsv';
import pentrarLogo from '@assets/svg/LogoPentrar.svg';
import { getToken } from '@hooks/localStorageHook';
import { BiDotsHorizontalRounded, BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { useMemo } from 'react';

const active = ({ isActive }: { isActive: boolean }) => {
  return {
    fill: isActive ? '#0000FF' : 'white',
    border: isActive ? '2px solid white' : 'white',
    borderRadius: '8px',
    transition: 'all .3s',
  };
};

function SideNav() {
  const location = useLocation();
  const pathName = location.pathname.split('/')[2];
  const { authUser, setAuthUser } = useAuthContext();
  console.log(pathName);
  const navigate = useNavigate();

  const navList = useMemo(() => {
    return authUser?.roles === Account.Aggregator
      ? AGGREGATOR_SIDENAV
      : authUser?.roles === Account.Exporter
      ? EXPORTER_SIDENAV
      : AGGREGATOR_SIDENAV;
  }, [authUser?.roles]);

  const handleLogout = () => {
    logOut();
    const token = getToken();
    if (!token) {
      setAuthUser(null);
      navigate('/');
    }
  };

  const menuOptions = [
    {
      menuTitle: 'View Profile',
      action: () => navigate('/admin/profile'),
      icon: <CgProfile />,
      classname: `text-[#101828]`,
    },
    {
      menuTitle: 'Log out',
      action: handleLogout,
      icon: <BiLogOut />,
      classname: `text-[#b42318]`,
    },
  ];

  let first_name: string | undefined;

  if (authUser?.full_name) {
    first_name = capitalize(
      getFirstSwordBeforeSpace(authUser?.full_name as unknown as string),
    );
  }

  return (
    <div className="bg-[#FFFFFF] text-[#999999] flex flex-col justify-between border-r-2 border-[#F7F7F8] h-screen">
      <div className="mt-[13px]">
        <div className="h-[5rem] px-[16px] py-[8px]">
          <img src={pentrarLogo} alt="peoplelogo" className="h-[40px]" />
        </div>
        <div className="flex flex-col gap-2">
          {navList?.map(sidenav => {
            const checkPath = pathName === sidenav.path;
            return (
              <div
                className={checkPath ? 'px-4 border-r-[3px] mr-1' : 'px-4'}
                key={sidenav.name}
              >
                <NavLink
                  className="text-[18px] pl-3 font-[400] h-[40px] active:font-[400]  flex items-center gap-3"
                  to={sidenav.path}
                  key={sidenav.name}
                  style={active}
                  role={sidenav.name}
                >
                  <span className={checkPath ? '-ml-[2px]' : 'ml-0'}>
                    {sidenav.Icon}
                  </span>

                  <span>{sidenav.name}</span>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="w-full bg-[#E2E8F0] border[1px] h-[1px]" />
        <div className="flex flex-col px-4 py-4 text-[#999999]">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-[600]">{capitalize(first_name)}</p>
            <Menu
              align="end"
              position="anchor"
              direction="top"
              menuButton={
                <MenuButton role="listitem">
                  <BiDotsHorizontalRounded />
                </MenuButton>
              }
              transition={true}
            >
              {menuOptions?.map((menuItem, i) => {
                return (
                  <MenuItem
                    className="w-[14rem] flex gap-2 items-center"
                    key={i}
                    onClick={() => menuItem?.action()}
                    role={menuItem?.menuTitle}
                  >
                    <span>{menuItem.icon}</span>
                    <span
                      className={`${menuItem.classname} text-[12px] font-[500]`}
                    >
                      {menuItem?.menuTitle}
                    </span>
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
          <p
            className="text-[12px] font-[400] whitespace-nowrap"
            role="username"
          >
            {authUser?.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
