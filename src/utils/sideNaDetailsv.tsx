// type SvgInHtml = typeof BuildingIcon;
import { ReactNode } from 'react';
import { ReactComponent as Home } from '@assets/svg/dashHome.svg';
// import { ReactComponent as HomeWhite } from '@assets/svg/dashHomeWhite.svg';
import { ReactComponent as Search } from '@assets/svg/dashSearch.svg';
import { ReactComponent as Folder } from '@assets/svg/dashFolder.svg';

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

export { AGGREGATOR_SIDENAV, EXPORTER_SIDENAV };
