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
    path: 'my-produces',
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
  {
    name: 'My Order',
    path: 'myorder-list',
    Icon: <Folder />,
    // IconBlue: BlueGroup,
  },
];

const SETTINGS_SIDENAV: NavLInk[] = [
  {
    name: 'Report a problem',
    path: 'report-problem',
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

const SUPER_ADMIN_SIDENAV: NavLInk[] = [
  {
    name: 'Dashboard',
    path: 'admin-dashboard',
    Icon: <Home />,
  },
  {
    name: 'Produces',
    path: 'all-produces',
    Icon: <Home />,
  },
  {
    name: 'Farmers',
    path: 'all-farmers',
    Icon: <Home />,
  },
  {
    name: 'Transporters',
    path: 'all-transporters',
    Icon: <Home />,
  },
  {
    name: 'Aggregators',
    path: 'all-aggregators',
    Icon: <Home />,
  },
  {
    name: 'Exporters',
    path: 'all-exporters',
    Icon: <Home />,
  },
  {
    name: 'Offtakers',
    path: 'all-offtakers',
    Icon: <Home />,
  },
  {
    name: 'Agencies',
    path: 'all-agencies',
    Icon: <Home />,
  },
];

export {
  AGGREGATOR_SIDENAV,
  EXPORTER_SIDENAV,
  SETTINGS_SIDENAV,
  SUPER_ADMIN_SIDENAV,
};
