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
  () => import('@modules/agency/pages/certifications/pendingCertification'),
);

const AgencyProcessingCertification = React.lazy(
  () => import('@modules/agency/pages/certifications/processingCertification'),
);

const AgencyCompletedCertification = React.lazy(
  () => import('@modules/agency/pages/certifications/completedCertification'),
);

const AgencyCollectedCertification = React.lazy(
  () => import('@modules/agency/pages/certifications/collectedCertification'),
);

const AgencyInspectedCertification = React.lazy(
  () => import('@modules/agency/pages/certifications/inspectCertification'),
);

const AgencyTeamMember = React.lazy(
  () => import('@modules/agency/pages/teamMember'),
);

const AgencyTeamMemberDetail = React.lazy(
  () => import('@modules/agency/pages/teamMember/teamMemberDetail'),
);

const AgencySettings = React.lazy(
  () => import('@modules/agency/pages/settings'),
);

const AgencyCertificationDetail = React.lazy(
  () =>
    import('../../../components/certifcationDetail/certificationDetailView'),
);

export const agencyPathsLinks = {
  basePath: 'pentrar/agency',
  dashBoard: 'dashboard',
  certifications: 'certifications',
  processingCertifications: 'processing',
  completedCertifications: 'certified',
  collectedCertifications: 'collected',
  inspectedCertifications: 'inspected',
  teamMember: 'team-member',
  teamMemberDetail: 'team-member/:id/detail',
  settings: 'profile-settings',
  certificationDetails: 'certifications/:id/:tab',
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
        element: AgencyCollectedCertification,
        path: agencyPathsLinks.collectedCertifications,
      },
      {
        element: AgencyProcessingCertification,
        path: agencyPathsLinks.processingCertifications,
      },
      {
        element: AgencyCompletedCertification,
        path: agencyPathsLinks.completedCertifications,
      },
      {
        element: AgencyInspectedCertification,
        path: agencyPathsLinks.inspectedCertifications,
      },
    ],
  },

  AgencyCertificationDetail: {
    element: AgencyCertificationDetail,
    path: agencyPathsLinks.certificationDetails,
  },

  AgencyTeamMember: {
    element: AgencyTeamMember,
    path: agencyPathsLinks.teamMember,
  },

  AgencyTeamMemberDetail: {
    element: AgencyTeamMemberDetail,
    path: agencyPathsLinks.teamMemberDetail,
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
