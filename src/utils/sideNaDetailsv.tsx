// type SvgInHtml = typeof BuildingIcon;
import { ReactNode } from 'react';
import { ReactComponent as Home } from '@assets/svg/dashHome.svg';
import { ReactComponent as Search } from '@assets/svg/dashSearch.svg';
import { ReactComponent as Folder } from '@assets/svg/dashFolder.svg';
import { ReactComponent as SettingIcon } from '@assets/svg/dashSettings.svg';
import { ReactComponent as Caution } from '@assets/svg/dashCaution.svg';
import { ReactComponent as Personal } from '@assets/svg/personalSvg.svg';
import { ReactComponent as Briefcase } from '@assets/svg/briefcaseVector.svg';
import { ReactComponent as Password } from '@assets/svg/passwordLock.svg';
import { ReactComponent as Notify } from '@assets/svg/notifySvg.svg';
import { ReactComponent as PersonalActive } from '@assets/svg/personalActive.svg';
import { ReactComponent as BriefcaseActive } from '@assets/svg/briefcaseActive.svg';
import { ReactComponent as PasswordActive } from '@assets/svg/lockActive.svg';
import { ReactComponent as NotifyActive } from '@assets/svg/notifyActive.svg';
import { ReactComponent as SettingsWhite } from '@assets/svg/dashSettingWhite.svg';
import { ReactComponent as HomeWhite } from '@assets/svg/dashHomeWhite.svg';
import { ReactComponent as FolderWhite } from '@assets/svg/dashFolderWhite.svg';
import { ReactComponent as SearchWhite } from '@assets/svg/dashSearchWhite.svg';
import { ReactComponent as ProduceIcon } from '@assets/svg/produceIcon.svg';
import { ReactComponent as FarmerIcon } from '@assets/svg/farmerIcon.svg';
import { ReactComponent as AggregatorIcon } from '@assets/svg/aggregatorIcon.svg';
import { ReactComponent as ExporterIcon } from '@assets/svg/exporterIcon.svg';
import { ReactComponent as OfftakerIcon } from '@assets/svg/offtakerIcon.svg';
import { ReactComponent as AgencyIcon } from '@assets/svg/agencyIcon.svg';
import { ReactComponent as TeamIcon } from '@assets/svg/teamIcon.svg';
import { ReactComponent as TeamWhite } from '@assets/svg/teamWhite.svg';
import { ReactComponent as BadgeWhite } from '@assets/svg/badgeWhite.svg';
import { ReactComponent as Badge } from '@assets/svg/badge.svg';
import { ReactComponent as OrderWhite } from '@assets/svg/orderWhite.svg';
import { ReactComponent as OrderDark } from '@assets/svg/orderDark.svg';
import { ReactComponent as ProduceWhite } from '@assets/svg/produceWhite.svg';
import { ReactComponent as FarmerWhite } from '@assets/svg/farmerWhite.svg';
import { ReactComponent as AggregatorWhite } from '@assets/svg/aggregatorWhite.svg';
import { ReactComponent as ExporterWhite } from '@assets/svg/exporterWhite.svg';
import { ReactComponent as OfftakerWhite } from '@assets/svg/offtakerWhite.svg';
import { ReactComponent as AgencyWhite } from '@assets/svg/agencyWhite.svg';

export type NavLInk = {
  name: string;
  path: string;
  Icon: ReactNode;
  IconBlue?: ReactNode;
  disabled?: boolean;
};

export type SettingNavLink = Omit<NavLInk, 'path'>;

const AGGREGATOR_SIDENAV: NavLInk[] = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    Icon: <Home />,
    IconBlue: <HomeWhite />,
  },
  {
    name: 'Pentrar Hub',
    path: 'pentrar-hub',
    Icon: <Search />,
    IconBlue: <SearchWhite />,
  },
  {
    name: 'Transfers',
    path: 'my-transfers',
    Icon: <Folder />,
    IconBlue: <FolderWhite />,
  },
  {
    name: 'My Produce',
    path: 'my-produce',
    Icon: <Folder />,
    IconBlue: <FolderWhite />,
  },
];

const EXPORTER_SIDENAV: NavLInk[] = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    Icon: <Home />,
    IconBlue: <HomeWhite />,
  },
  {
    name: 'Pentrar Hub',
    path: 'pentrar-hub',
    Icon: <Search />,
    IconBlue: <SearchWhite />,
  },
  {
    name: 'Transfers',
    path: 'my-transfers',
    Icon: <Folder />,
    IconBlue: <FolderWhite />,
  },
  {
    name: 'My Produce',
    path: 'my-produce',
    Icon: <Folder />,
    IconBlue: <FolderWhite />,
  },
  {
    name: 'Certifications',
    path: 'certifications',
    Icon: <Badge />,
    IconBlue: <BadgeWhite />,
  },
  {
    name: 'My Order',
    path: 'myorder-list',
    Icon: <OrderDark />,
    IconBlue: <OrderWhite />,
  },
];

const SETTINGS_SIDENAV: NavLInk[] = [
  {
    name: 'Report a problem',
    path: 'report-problem',
    Icon: <Caution />,
    disabled: true,
    // IconBlue: <HomeWhite />,
  },
  {
    name: 'Profile Settings',
    path: 'profile-settings',
    Icon: <SettingIcon />,
    IconBlue: <SettingsWhite />,
  },
];

const ADMIN_SETTINGS_SIDENAV: NavLInk[] = [
  {
    name: 'Team',
    path: 'all-teams',
    Icon: <TeamIcon />,
    IconBlue: <TeamWhite />,
  },
  {
    name: 'Profile Settings',
    path: 'profile-settings',
    Icon: <SettingIcon />,
    IconBlue: <SettingsWhite />,
  },
];

const SUPER_ADMIN_SIDENAV: NavLInk[] = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    Icon: <Home />,
    IconBlue: <HomeWhite />,
  },
  {
    name: 'Produce',
    path: 'all-produce',
    Icon: <ProduceIcon />,
    IconBlue: <ProduceWhite />,
  },
  {
    name: 'Farmers',
    path: 'all-farmers',
    Icon: <FarmerIcon />,
    IconBlue: <FarmerWhite />,
  },
  // {
  //   name: 'Transporters',
  //   path: 'all-transporters',
  //   Icon: <ExporterIcon />,
  // },

  {
    name: 'Aggregators',
    path: 'all-aggregators',
    Icon: <AggregatorIcon />,
    IconBlue: <AggregatorWhite />,
  },
  {
    name: 'Exporters',
    path: 'all-exporters',
    Icon: <ExporterIcon />,
    IconBlue: <ExporterWhite />,
  },
  {
    name: 'Offtakers',
    path: 'all-offtakers',
    Icon: <OfftakerIcon />,
    IconBlue: <OfftakerWhite />,
  },
  {
    name: 'Agencies',
    path: 'all-agencies',
    Icon: <AgencyIcon />,
    IconBlue: <AgencyWhite />,
  },
];

const SETTINGS_PAGE_NAVLIST: SettingNavLink[] = [
  {
    name: 'Personal Information',
    Icon: <Personal />,
    IconBlue: <PersonalActive />,
  },
  {
    name: 'Business Information',
    Icon: <Briefcase />,
    IconBlue: <BriefcaseActive />,
  },
  {
    name: 'Change Password',
    Icon: <Password />,
    IconBlue: <PasswordActive />,
  },
  {
    name: 'Notifications',
    Icon: <Notify />,
    IconBlue: <NotifyActive />,
  },
];

const AGENCY_SIDENAV: NavLInk[] = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    Icon: <Home />,
    IconBlue: <HomeWhite />,
  },
  {
    name: 'Certifications',
    path: 'certifications',
    Icon: <Badge />,
    IconBlue: <BadgeWhite />,
  },
  {
    name: 'Team',
    path: 'team-member',
    Icon: <TeamIcon />,
    IconBlue: <TeamWhite />,
  },
  {
    name: 'Profile Settings',
    path: 'profile-settings',
    Icon: <SettingIcon />,
    IconBlue: <SettingsWhite />,
  },
];

const SUBADMIN_NAVLINK: NavLInk[] = SUPER_ADMIN_SIDENAV.filter(
  item => item.name !== 'Dashboard',
);
const SUBADMIN_SETTINGS = ADMIN_SETTINGS_SIDENAV.filter(
  navLink => navLink.name !== 'Team',
);

const SUBADGENCY_NAVLINK: NavLInk[] = AGENCY_SIDENAV.filter(
  item => item.name !== 'Team',
);

export {
  AGGREGATOR_SIDENAV,
  EXPORTER_SIDENAV,
  SETTINGS_SIDENAV,
  SUPER_ADMIN_SIDENAV,
  SETTINGS_PAGE_NAVLIST,
  ADMIN_SETTINGS_SIDENAV,
  SUBADMIN_NAVLINK,
  SUBADMIN_SETTINGS,
  AGENCY_SIDENAV,
  SUBADGENCY_NAVLINK,
};
