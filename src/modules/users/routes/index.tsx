import { Account } from '@utils/constants';
import React from 'react';
import DashboardLayout from '../../AppDashboard';

const HomeDashBoard = React.lazy(
  () => import('@modules/users/pages/dashboard'),
);
const UserPentrarHub = React.lazy(
  () => import('@modules/users/pages/userPentrarHub'),
);

const UserProduce = React.lazy(
  () => import('@modules/users/pages/userProduce'),
);

const UserSettings = React.lazy(
  () => import('@modules/users/pages/userSettings'),
);

const ReportProblem = React.lazy(
  () => import('@modules/users/pages/reportProblem'),
);

const MyProduceDetailPage = React.lazy(
  () => import('@modules/users/pages/userProduce/individualProduce'),
);

export const userPathsLinks = {
  basePath: 'pentrar/user',
  dashBoard: 'dashboard',
  pentrarHub: 'pentrar-hub',
  myProduces: 'my-produces',
  myProduceDetails: 'my-produce/:id/details',
  settings: 'settings',
  reportProblem: 'report-problem',
  personalInfo: '/pentrar/user/settings/personal-information',
  businessInfo: '/pentrar/user/settings/business-information',
};

const userRoutes = {
  HomeDashBoard: {
    element: HomeDashBoard,
    path: userPathsLinks.dashBoard,
  },

  UserPentrarHub: {
    element: UserPentrarHub,
    path: userPathsLinks.pentrarHub,
  },

  UserProduce: {
    element: UserProduce,
    path: userPathsLinks.myProduces,
  },

  UserSettings: {
    element: UserSettings,
    path: userPathsLinks.settings,
  },

  MyProduceDetailPage: {
    element: MyProduceDetailPage,
    path: userPathsLinks.myProduceDetails,
  },

  ReportProblem: {
    element: ReportProblem,
    path: userPathsLinks.reportProblem,
  },
};

export const UserAppRoute = {
  AppLayout: DashboardLayout,
  IndexRoute: HomeDashBoard,
  AllowedRoles: [Account.Aggregator, Account.Farmer],
  BasePath: userPathsLinks.basePath,
  ListedRoutes: userRoutes,
};
