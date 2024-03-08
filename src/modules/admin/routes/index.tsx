import { Account } from '@utils/constants';
import React from 'react';
import DashboardLayout from '../../AppDashboard';

const AdminDashboard = React.lazy(
  () => import('@modules/admin/pages/dashboard'),
);
const AgencyList = React.lazy(() => import('@modules/admin/pages/agency'));

const ProduceList = React.lazy(() => import('@modules/admin/pages/produce'));

const TransporterList = React.lazy(
  () => import('@modules/admin/pages/transporter'),
);

const AggregatorList = React.lazy(
  () => import('@modules/admin/pages/aggregator'),
);

const ExporterList = React.lazy(() => import('@modules/admin/pages/exporter'));

const OfftakerList = React.lazy(() => import('@modules/admin/pages/offtaker'));

const FarmerList = React.lazy(() => import('@modules/admin/pages/farmer'));

const SubAdminList = React.lazy(() => import('@modules/admin/pages/subadmin'));

export const adminPathsLinks = {
  basePath: 'pentrar/admin',
  dashBoard: 'dashboard',
  allAgencies: 'all-agencies',
  allProduce: 'all-produces',
  allTransporters: 'all-transporters',
  allAggregators: 'all-aggregators',
  allExporters: 'all-exporters',
  allOfftakers: 'all-offtakers',
  allFarmers: 'all-farmers',
  allSubAdmins: 'all-subAdmins',
};

const AdminRoutes = {
  AdminDashBoard: {
    element: AdminDashboard,
    path: adminPathsLinks.dashBoard,
  },

  ProduceList: {
    element: ProduceList,
    path: adminPathsLinks.allProduce,
  },

  SubAdminList: {
    element: SubAdminList,
    path: adminPathsLinks.allSubAdmins,
  },

  FarmerList: {
    element: FarmerList,
    path: adminPathsLinks.allFarmers,
  },

  AggregatorList: {
    element: AggregatorList,
    path: adminPathsLinks.allAggregators,
  },

  AgencyList: {
    element: AgencyList,
    path: adminPathsLinks.allAgencies,
  },

  TransporterList: {
    element: TransporterList,
    path: adminPathsLinks.allTransporters,
  },

  ExporterList: {
    element: ExporterList,
    path: adminPathsLinks.allExporters,
  },

  OfftakerList: {
    element: OfftakerList,
    path: adminPathsLinks.allOfftakers,
  },
};

export const AdminAppRoute = {
  AppLayout: DashboardLayout,
  IndexRoute: AdminDashboard,
  AllowedRoles: [Account.Admin],
  BasePath: adminPathsLinks.basePath,
  ListedRoutes: AdminRoutes,
};
