import { adminFarmersTabs } from './enums';
import { adminPathsLinks } from '@modules/admin/routes';
import { BasePath } from 'routes/Routes';
import { joinPath } from './navigation';

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
