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

const TeamList = React.lazy(() => import('@modules/admin/pages/subadmin'));

const ProduceDetailPage = React.lazy(
  () => import('../../../components/produceDetail/individualProduce'),
);

const FarmerDetailPage = React.lazy(
  () => import('@modules/admin/pages/farmer/farmerDetailPage'),
);

const AggregatorDetailPage = React.lazy(
  () => import('@modules/admin/pages/aggregator/aggregatorDetailPage'),
);

const AgencyDetailPage = React.lazy(
  () => import('@modules/admin/pages/agency/agencyDetailPage'),
);

const AdminSetings = React.lazy(() => import('@modules/admin/pages/settings'));

export const adminPathsLinks = {
  basePath: 'pentrar/admin',
  dashBoard: 'dashboard',
  allAgencies: 'all-agencies',
  agencyDetail: 'all-agencies/:id/:tab',
  allProduce: 'all-produces',
  produceDtail: 'all-produces/:id/produce-detail',
  allTransporters: 'all-transporters',
  allAggregators: 'all-aggregators',
  aggregatorDetail: 'all-aggregators/:id/:userType/:tab',
  allExporters: 'all-exporters',
  allOfftakers: 'all-offtakers',
  allFarmers: 'all-farmers',
  farmerDetail: 'all-farmers/:id/:userType/:tab',
  allTeams: 'all-teams',
  allSettings: 'settings',
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

  ProduceDetail: {
    element: ProduceDetailPage,
    path: adminPathsLinks.produceDtail,
  },

  TeamList: {
    element: TeamList,
    path: adminPathsLinks.allTeams,
  },

  FarmerList: {
    element: FarmerList,
    path: adminPathsLinks.allFarmers,
  },

  FarmerDetail: {
    element: FarmerDetailPage,
    path: adminPathsLinks.farmerDetail,
  },

  AggregatorList: {
    element: AggregatorList,
    path: adminPathsLinks.allAggregators,
  },

  AggregatorDetail: {
    element: AggregatorDetailPage,
    path: adminPathsLinks.aggregatorDetail,
  },

  AgencyList: {
    element: AgencyList,
    path: adminPathsLinks.allAgencies,
  },

  AgencyDetail: {
    element: AgencyDetailPage,
    path: adminPathsLinks.agencyDetail,
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

  AdminSettings: {
    element: AdminSetings,
    path: adminPathsLinks.allSettings,
  },
};

export const AdminAppRoute = {
  AppLayout: DashboardLayout,
  IndexRoute: AdminDashboard,
  AllowedRoles: [Account.Admin, Account.SubAdmin],
  BasePath: adminPathsLinks.basePath,
  ListedRoutes: AdminRoutes,
};
