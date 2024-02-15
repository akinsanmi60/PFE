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

const AdminRoutes = {
  AdminDashBoard: {
    element: AdminDashboard,
    path: 'admin-dashboard',
  },

  AgencyList: {
    element: AgencyList,
    path: 'all-agencies',
  },

  ProduceList: {
    element: ProduceList,
    path: 'all-produces',
  },

  TransporterList: {
    element: TransporterList,
    path: 'all-transporters',
  },

  AggregatorList: {
    element: AggregatorList,
    path: 'all-aggregators',
  },

  ExporterList: {
    element: ExporterList,
    path: 'all-exporters',
  },

  OfftakerList: {
    element: OfftakerList,
    path: 'all-offtakers',
  },

  FarmerList: {
    element: FarmerList,
    path: 'all-farmers',
  },
};

export const UserAppRoute = {
  AppLayout: DashboardLayout,
  IndexRoute: AdminDashboard,
  AllowedRoles: [Account.SuperAdmin],
  BasePath: 'pentrar/user',
  ListedRoutes: AdminRoutes,
};
