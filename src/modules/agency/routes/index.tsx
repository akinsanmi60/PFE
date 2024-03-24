import { Account } from '@utils/constants';
import React from 'react';
import DashboardLayout from '../../AppDashboard';

const HomeDashBoard = React.lazy(
  () => import('@modules/agency/pages/dashboard'),
);
const AgencyCertification = React.lazy(
  () => import('@modules/agency/pages/certifications'),
);

const AgencyPendingCertification = React.lazy(
  () => import('@modules/agency/pages/certifications/pendingCretification'),
);

const AgencyProcessingCertification = React.lazy(
  () => import('@modules/agency/pages/certifications/processingCertification'),
);

const AgencyTeamMember = React.lazy(
  () => import('@modules/agency/pages/teamMember'),
);

const AgencySettings = React.lazy(
  () => import('@modules/agency/pages/settings'),
);

export const agencyPathsLinks = {
  basePath: 'pentrar/agency',
  dashBoard: 'dashboard',
  certifications: 'certifications',
  processingCertifications: 'processing',
  teamMember: 'team-member',
  settings: 'settings',
};

const agencyRoutes = {
  HomeDashBoard: {
    element: HomeDashBoard,
    path: agencyPathsLinks.dashBoard,
  },

  AgencyCertification: {
    element: AgencyCertification,
    path: agencyPathsLinks.certifications,
    childrenRoutes: [
      {
        element: AgencyPendingCertification,
        path: '',
        useIndex: true,
      },
      {
        element: AgencyProcessingCertification,
        path: agencyPathsLinks.processingCertifications,
      },
    ],
  },

  AgencyTeamMember: {
    element: AgencyTeamMember,
    path: agencyPathsLinks.teamMember,
  },

  AgencySettings: {
    element: AgencySettings,
    path: agencyPathsLinks.settings,
  },
};

export const AgencyAppRoute = {
  AppLayout: DashboardLayout,
  IndexRoute: HomeDashBoard,
  AllowedRoles: [
    Account.Agency,
    Account['Agency Staff'],
    Account['Agency Admin'],
  ],
  BasePath: 'pentrar/agency',
  ListedRoutes: agencyRoutes,
};
