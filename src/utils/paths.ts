import { adminFarmersTabs, agencyTabs } from './enums';
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
export const FarmersPath = {
  root: (fullPath: boolean = true) =>
    `${fullPath ? `${BasePath.ADMIN}/` : ''}${adminPathsLinks.allFarmers}`,
  farmersDetails: (
    farmerId: string,
    detail: string,
    tab: IFarmersAggregatorTab | null,
    fullPath: boolean = true,
  ) => `${joinPath(FarmersPath.root(fullPath), farmerId, detail, tab)}`,
};

export const AggregatorsPath = {
  root: (fullPath: boolean = true) =>
    `${fullPath ? `${BasePath.ADMIN}/` : ''}${adminPathsLinks.allAggregators}`,
  aggregatorsDetails: (
    aggregatorId: string,
    detail: string,
    tab: IFarmersAggregatorTab | null,
    fullPath: boolean = true,
  ) => `${joinPath(AggregatorsPath.root(fullPath), aggregatorId, detail, tab)}`,
};

export type IAgencyTab = typeof agencyTabs[number];
export const AgencyPath = {
  root: (fullPath: boolean = true) =>
    `${fullPath ? `${BasePath.ADMIN}/` : ''}${adminPathsLinks.allAgencies}`,

  agencyDetails: (
    agencyId: string,
    tab: IAgencyTab | null,
    fullPath: boolean = true,
  ) => `${joinPath(AgencyPath.root(fullPath), agencyId, tab)}`,
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
  myOrder: (fullPath: boolean = true) =>
    `${ExporterPath.root(fullPath)}${exporterPathsLinks.orders}`,
};
