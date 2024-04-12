import React from 'react';
import { Account } from '@utils/constants';
import DashboardLayout from '../../AppDashboard';

const ExporterDashboard = React.lazy(
  () => import('@modules/exporter/pages/dashboard'),
);

const ExporterOrder = React.lazy(
  () => import('@modules/exporter/pages/orders'),
);

const ExporterProduce = React.lazy(
  () => import('@modules/exporter/pages/produces'),
);

const ExporterPentrarHub = React.lazy(
  () => import('@modules/exporter/pages/pentraHub'),
);

const ExporterSettings = React.lazy(
  () => import('@modules/exporter/pages/settings'),
);

const ReportProblem = React.lazy(
  () => import('@modules/exporter/pages/reportProblem'),
);

const MyTransferPage = React.lazy(
  () => import('@modules/exporter/pages/transfers'),
);

const ToTransferPage = React.lazy(
  () => import('@modules/exporter/pages/transfers/toTransfer'),
);

const FromTransferPage = React.lazy(
  () => import('@modules/exporter/pages/transfers/fromTransfer'),
);

export const exporterPathsLinks = {
  basePath: 'pentrar/exporter',
  dashBoard: 'dashboard',
  orders: 'myorder-list',
  produce: 'my-produce',
  pentraHub: 'pentrar-hub',
  myTransfers: 'my-transfers',
  fromTransfer: 'from-transfer',
  settings: 'profile-settings',
  reportProblem: 'report-problem',
};

const ExporterRoutes = {
  ExporterDashboard: {
    element: ExporterDashboard,
    path: exporterPathsLinks.dashBoard,
  },

  ExporterOrder: {
    element: ExporterOrder,
    path: exporterPathsLinks.orders,
  },

  ExporterProduce: {
    element: ExporterProduce,
    path: exporterPathsLinks.produce,
  },

  ExporterPentrarHub: {
    element: ExporterPentrarHub,
    path: exporterPathsLinks.pentraHub,
  },

  ExporterSettings: {
    element: ExporterSettings,
    path: exporterPathsLinks.settings,
  },

  ReportProblem: {
    element: ReportProblem,
    path: exporterPathsLinks.reportProblem,
  },

  MyTransfers: {
    element: MyTransferPage,
    path: exporterPathsLinks.myTransfers,
    childrenRoutes: [
      {
        element: FromTransferPage,
        path: '',
        useIndex: true,
      },

      {
        element: ToTransferPage,
        path: exporterPathsLinks.fromTransfer,
      },
    ],
  },
};

export const RenderExporterRoute = {
  AppLayout: DashboardLayout,
  IndexRoute: ExporterDashboard,
  AllowedRoles: [Account.Exporter],
  BasePath: exporterPathsLinks.basePath,
  ListedRoutes: ExporterRoutes,
};
