import { Account } from './constants';

export type IUserRole =
  | 'admin'
  | 'subAdmin'
  | 'farmer'
  | 'exporter'
  | 'agency'
  | 'aggregator'
  | 'offtaker'
  | 'agencyAdmin'
  | 'agencySubAdmin';

export const getUserRoleLabel = (role: string) => {
  if (role === Account.SubAdmin) return 'Sub Admin';
  if (role === Account.Admin) return 'Admin';
  if (role === Account.Farmer) return 'Farmer';
  if (role === Account.Exporter) return 'Exporter';
  if (role === Account.Agency) return 'Agency';
  if (role === Account.Aggregator) return 'Aggregator';
  if (role === Account.Offtakers) return 'Offtaker';
  if (role === Account['Agency Admin']) return 'Agency Admin';
  if (role === Account['Agency Staff']) return 'Agency Staff';
  return 'Farmer';
};
