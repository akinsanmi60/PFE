// type SvgInHtml = typeof BuildingIcon;
import { ReactNode } from 'react';
import { ReactComponent as Home } from '@assets/svg/dashHome.svg';
import { ReactComponent as Search } from '@assets/svg/dashSearch.svg';
import { ReactComponent as Folder } from '@assets/svg/dashFolder.svg';
import { ReactComponent as SettingIcon } from '@assets/svg/dashSettings.svg';
import { ReactComponent as Caution } from '@assets/svg/dashCaution.svg';

interface NavLInk {
  name: string;
  path: string;
  Icon: ReactNode;
  // IconBlue: SvgInHtml;
}
// const ADMIN_SIDENAV_NOTIFICATION: NavLInk = {
//   name: 'Notifications',
//   path: DashboardPath.NOTIFICATIONS,
//   Icon: Bell,
// IconBlue: BlueBell,
// };

const AGGREGATOR_SIDENAV: NavLInk[] = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    Icon: <Home />,
    // IconBlue: <HomeWhite />,
  },
  {
    name: 'Pentrar Hub',
    path: 'pentrar-hub',
    Icon: <Search />,
    // IconBlue: BlueCustomer,
  },
  {
    name: 'My Produces',
    path: 'myproduces-list',
    Icon: <Folder />,
    // IconBlue: BlueGroup,
  },
];

const EXPORTER_SIDENAV: NavLInk[] = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    Icon: <Home />,
    // IconBlue: <HomeWhite />,
  },
  {
    name: 'Pentrar Hub',
    path: 'pentrar-hub',
    Icon: <Search />,
    // IconBlue: BlueCustomer,
  },
  {
    name: 'My Produces',
    path: 'myproduces-list',
    Icon: <Folder />,
    // IconBlue: BlueGroup,
  },
];

const SETTINGS_SIDENAV: NavLInk[] = [
  {
    name: 'Report a problem',
    path: 'reportProblem',
    Icon: <Caution />,
    // IconBlue: <HomeWhite />,
  },
  {
    name: 'Settings',
    path: 'settings',
    Icon: <SettingIcon />,
    // IconBlue: BlueCustomer,
  },
];

export { AGGREGATOR_SIDENAV, EXPORTER_SIDENAV, SETTINGS_SIDENAV };
