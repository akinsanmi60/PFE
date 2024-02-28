// type SvgInHtml = typeof BuildingIcon;
import { ReactNode } from 'react';
import { ReactComponent as Home } from '@assets/svg/dashHome.svg';
import { ReactComponent as Search } from '@assets/svg/dashSearch.svg';
import { ReactComponent as Folder } from '@assets/svg/dashFolder.svg';
import { ReactComponent as SettingIcon } from '@assets/svg/dashSettings.svg';
import { ReactComponent as Caution } from '@assets/svg/dashCaution.svg';
import { ReactComponent as Personal } from '@assets/svg/PersonalSvg.svg';
import { ReactComponent as Briefcase } from '@assets/svg/briefcaseVector.svg';
import { ReactComponent as Password } from '@assets/svg/passwordLock.svg';
import { ReactComponent as Notify } from '@assets/svg/notifySvg.svg';
import { ReactComponent as PersonalActive } from '@assets/svg/personalActive.svg';
import { ReactComponent as BriefcaseActive } from '@assets/svg/briefcaseActive.svg';
import { ReactComponent as PasswordActive } from '@assets/svg/lockActive.svg';
import { ReactComponent as NotifyActive } from '@assets/svg/notifyActive.svg';

export interface NavLInk {
  name: string;
  path: string;
  Icon: ReactNode;
  IconBlue?: ReactNode;
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

const SETTINGS_PAGE_NAVLIST: NavLInk[] = [
  {
    name: 'Personal Information',
    path: 'personal-information',
    Icon: <Personal />,
    IconBlue: <PersonalActive />,
  },
  {
    name: 'Business Information',
    path: 'business-information',
    Icon: <Briefcase />,
    IconBlue: <BriefcaseActive />,
  },
  {
    name: 'Change Password',
    path: 'change-password',
    Icon: <Password />,
    IconBlue: <PasswordActive />,
  },
  {
    name: 'Notifications',
    path: 'notifications',
    Icon: <Notify />,
    IconBlue: <NotifyActive />,
  },
];

export {
  AGGREGATOR_SIDENAV,
  EXPORTER_SIDENAV,
  SETTINGS_SIDENAV,
  SUPER_ADMIN_SIDENAV,
  SETTINGS_PAGE_NAVLIST,
};
