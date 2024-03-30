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

export const exporterPathsLinks = {
  basePath: 'pentrar/exporter',
  dashBoard: 'dashboard',
  orders: 'myorder-list',
  produces: 'my-produces',
  pentraHub: 'pentrar-hub',
  settings: 'settings',
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
    path: exporterPathsLinks.produces,
  },

  ExporterPentrarHub: {
    element: ExporterPentrarHub,
    path: exporterPathsLinks.pentraHub,
  },

  ExporterSettings: {
    element: ExporterSettings,
    path: exporterPathsLinks.settings,
  },
};

export const RenderExporterRoute = {
  AppLayout: DashboardLayout,
  IndexRoute: ExporterDashboard,
  AllowedRoles: [Account.Exporter],
  BasePath: exporterPathsLinks.basePath,
  ListedRoutes: ExporterRoutes,
};
