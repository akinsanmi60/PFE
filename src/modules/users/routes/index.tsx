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
  () => import('../../../components/produceDetail/individualProduce'),
);

const MyTransferPage = React.lazy(
  () => import('@modules/users/pages/userTransfers'),
);

const ToTransferPage = React.lazy(
  () => import('../../../components/transfersComponents/toTransfer'),
);

const FromTransferPage = React.lazy(
  () => import('../../../components/transfersComponents/fromTransfer'),
);

export const userPathsLinks = {
  basePath: 'pentrar/user',
  dashBoard: 'dashboard',
  pentrarHub: 'pentrar-hub',
  myProduces: 'my-produce',
  myTransfers: 'my-transfers',
  fromTransfer: 'from-transfer',
  myProduceDetails: 'my-produce/:id/details',
  settings: 'profile-settings',
  reportProblem: 'report-problem',
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

  MyTransfers: {
    element: MyTransferPage,
    path: userPathsLinks.myTransfers,
    childrenRoutes: [
      {
        element: ToTransferPage,
        path: '',
        useIndex: true,
      },

      {
        element: FromTransferPage,
        path: userPathsLinks.fromTransfer,
      },
    ],
  },
};

export const UserAppRoute = {
  AppLayout: DashboardLayout,
  IndexRoute: HomeDashBoard,
  AllowedRoles: [Account.Aggregator, Account.Farmer],
  BasePath: userPathsLinks.basePath,
  ListedRoutes: userRoutes,
};
