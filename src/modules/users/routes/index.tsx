import { Account } from '@utils/constants';
import React from 'react';
import UserLayout from '..';

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

const userRoutes = {
  HomeDashBoard: {
    element: HomeDashBoard,
    path: 'dashboard',
  },

  UserPentrarHub: {
    element: UserPentrarHub,
    path: 'pentrar-hub',
  },

  UserProduce: {
    element: UserProduce,
    path: 'my-produces',
  },

  UserSettings: {
    element: UserSettings,
    path: 'settings',
  },

  ReportProblem: {
    element: ReportProblem,
    path: 'report-problem',
  },
};

export const UserAppRoute = {
  AppLayout: UserLayout,
  IndexRoute: HomeDashBoard,
  AllowedRoles: [Account.Aggregator, Account.Farmer],
  BasePath: 'pentrar/user',
  ListedRoutes: userRoutes,
};
