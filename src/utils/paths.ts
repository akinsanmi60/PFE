import { adminFarmersTabs, agencyTabs, exporterTabs } from './enums';
import { adminPathsLinks } from '@modules/admin/routes';
import { BasePath } from 'routes/Routes';
import { joinPath } from './navigation';
import { RootLink } from 'routes/routeObject';
import { agencyPathsLinks } from '@modules/agency/routes';
import { userPathsLinks } from '@modules/users/routes';
import { exporterPathsLinks } from '@modules/exporter/routes';

export const webPaths = {
  root: (fullPath: boolean = true) => `${fullPath ? `${BasePath.WEB}` : ''}`,
  home: (fullPath: boolean = true) => `${webPaths.root(fullPath)}`,
  about: (fullPath: boolean = true) => `${webPaths.root(fullPath)}about`,
  services: (fullpath: boolean = true) => `${webPaths.root(fullpath)}services`,
};

export const authPaths = {
  root: (fullPath: boolean = true) => `${fullPath ? `${BasePath.WEB}` : ''}`,
  login: (fullPath: boolean = true, namePath: string, type: string) =>
    `${joinPath(authPaths.root(fullPath), namePath, type)}`,
  registerUser: (fullPath: boolean = true, namePath: string, type: string) =>
    `${joinPath(authPaths.root(fullPath), namePath, type)}`,

  forgotPassword: (fullPath: boolean = true) =>
    `${authPaths.root(fullPath)}${RootLink.forgotPassword}`,
  resetPassword: (fullPath: boolean = true) =>
    `${authPaths.root(fullPath)}${RootLink.resetPassword}`,
  adminLogin: (fullPath: boolean = true) =>
    `${authPaths.root(fullPath)}${RootLink.adminLogin}`,
  agencyLogin: (fullPath: boolean = true) =>
    `${authPaths.root(fullPath)}${RootLink.agencyLogin}`,
  unauthourized: (fullPath: boolean = true) =>
    `${authPaths.root(fullPath)}${RootLink.unauthourized}`,
};

export type IFarmersAggregatorTab = typeof adminFarmersTabs[number];
export type IAgencyTab = typeof agencyTabs[number];

export type IExporterTab = typeof exporterTabs[number];

export const adminDashboardPaths = {
  root: (fullPath: boolean = true) => `${fullPath ? `${BasePath.ADMIN}` : ''}`,
  produceRootPath: (fullPath: boolean = true) =>
    `${joinPath(
      adminDashboardPaths.root(fullPath),
      adminPathsLinks.allProduce,
    )}`,
  produceDetail: (id: string, fullPath: boolean = true) =>
    `${joinPath(
      adminDashboardPaths.root(fullPath),
      adminPathsLinks.allProduce,
      id,
      'produce-detail',
    )}`,
  farmerRootPath: (fullPath: boolean = true) =>
    `${joinPath(
      adminDashboardPaths.root(fullPath),
      adminPathsLinks.allFarmers,
    )}`,
  farmersDetails: (
    farmerId: string,
    detail: string,
    tab: IFarmersAggregatorTab | null,
    fullPath: boolean = true,
  ) =>
    `${joinPath(
      adminDashboardPaths.root(fullPath),
      adminPathsLinks.allFarmers,
      farmerId,
      detail,
      tab,
    )}`,
  aggregatorRootPath: (fullPath: boolean = true) =>
    `${joinPath(
      adminDashboardPaths.root(fullPath),
      adminPathsLinks.allAggregators,
    )}`,
  aggregatorsDetails: (
    aggregatorId: string,
    detail: string,
    tab: IFarmersAggregatorTab | null,
    fullPath: boolean = true,
  ) =>
    `${joinPath(
      adminDashboardPaths.root(fullPath),
      adminPathsLinks.allAggregators,
      aggregatorId,
      detail,
      tab,
    )}`,
  exporterRootPath: (fullPath: boolean = true) =>
    `${joinPath(
      adminDashboardPaths.root(fullPath),
      adminPathsLinks.allExporters,
    )}`,
  exportersDetails: (
    exporterId: string,
    detail: string,
    tab: IExporterTab | null,
    fullPath: boolean = true,
  ) =>
    `${joinPath(
      adminDashboardPaths.root(fullPath),
      adminPathsLinks.allExporters,
      exporterId,
      detail,
      tab,
    )}`,
  agencyRootPath: (fullPath: boolean = true) =>
    `${joinPath(
      adminDashboardPaths.root(fullPath),
      adminPathsLinks.allAgencies,
    )}`,
  agencyDetails: (
    agencyId: string,
    tab: IAgencyTab | null,
    fullPath: boolean = true,
  ) =>
    `${joinPath(
      adminDashboardPaths.root(fullPath),
      adminPathsLinks.allAgencies,
      agencyId,
      tab,
    )}`,
  offtakerRootPath: (fullPath: boolean = true) =>
    `${joinPath(
      adminDashboardPaths.root(fullPath),
      adminPathsLinks.allOfftakers,
    )}`,
};

export const AgencyUserPath = {
  root: (fullPath: boolean = true) =>
    `${fullPath ? `${BasePath.AGENCY}/` : ''}`,
  certifications: (fullPath: boolean = true) =>
    `${AgencyUserPath.root(fullPath)}${agencyPathsLinks.certifications}`,
  certificationsProcessing: (fullPath: boolean = true) =>
    `${joinPath(AgencyUserPath.certifications(fullPath), 'processing')}`,
};

export const UserFarmerAggregatorPath = {
  root: (fullPath: boolean = true) => `${fullPath ? `${BasePath.USER}/` : ''}`,
};

export type ISettingsTab =
  | 'personal-information'
  | 'change-password'
  | 'notifications'
  | 'business-information';
export const FarmerAggregatorPath = {
  root: (fullPath: boolean = true) => `${fullPath ? `${BasePath.USER}/` : ''}`,
  settings: (
    linkdetail: string,
    tab: ISettingsTab | null,
    fullPath: boolean = true,
  ) => `${joinPath(FarmerAggregatorPath.root(fullPath), linkdetail, tab)}`,
  myTransfers: (fullPath: boolean = true) =>
    `${FarmerAggregatorPath.root(fullPath)}${userPathsLinks.myTransfers}`,
  fromTransfer: (fullPath: boolean = true) =>
    `${joinPath(FarmerAggregatorPath.myTransfers(fullPath), 'from-transfer')}`,
};

export const ExporterPath = {
  root: (fullPath: boolean = true) =>
    `${fullPath ? `${BasePath.EXPORTER}/` : ''}`,
  myTransfers: (fullPath: boolean = true) =>
    `${ExporterPath.root(fullPath)}${exporterPathsLinks.myTransfers}`,
  fromTransfer: (fullPath: boolean = true) =>
    `${joinPath(ExporterPath.myTransfers(fullPath), 'from-transfer')}`,
  myProduce: (fullPath: boolean = true) =>
    `${ExporterPath.root(fullPath)}${exporterPathsLinks.produce}`,
  myProduceDetail: (produceId: string, fullPath: boolean = true) =>
    `${joinPath(ExporterPath.myProduce(fullPath), produceId, 'details')}`,
  certificationRequest: (fullPath: boolean = true) =>
    `${ExporterPath.root(fullPath)}${exporterPathsLinks.certification}`,
  certificationRequestDetail: (certId: string, fullPath: boolean = true) =>
    `${joinPath(
      ExporterPath.certificationRequest(fullPath),
      certId,
      'detail',
    )}`,
  myOrder: (fullPath: boolean = true) =>
    `${ExporterPath.root(fullPath)}${exporterPathsLinks.orders}`,
};
