import { IPagenationSetter } from '@hooks/tableHook';
import { MouseEvent, SetStateAction } from 'react';

export type ITableBody = {
  [x: string]: string | number | string[] | number[] | boolean | any;
};

export type ITableProp = {
  tableHeads?: {
    label: string;
    accessor: string;
  }[];
  removeHeads?: {
    label: string;
    accessor: string;
  }[];
  showMenu?: boolean;
  dataTableSource?: ITableBody[];
  showPagination?: boolean;
  clickRow?: boolean;
  pathTo?: string;
  showDivider?: boolean;
  onMenuClick?: (_textType: ITableBody) => void;
  onRowClick?: (data: any) => typeof data;
  showRowModal?: boolean;
  rowDetailCollector?: React.Dispatch<SetStateAction<ITableBody>>;
  setValuer?: React.Dispatch<React.SetStateAction<IPagenationSetter>>;
  valuer?: {
    total: number;
    page_size: number;
    current_page: number;
    total_pages: number;
  };
  page_size?: number;
  handlePageChange?: number;
  total_pages?: number;
  total?: number;
  loading?: boolean | string;
  menuOptions?: {
    menuTitle: string;
    action: (_agentId: ITableBody) => void;
  }[];
  changeStatusStyled?: boolean;
  statusOptionMenu?: boolean;
  changeTextStyle?: boolean;
  tableLoader?: React.ReactNode;
  tableEmptyState?: React.ReactNode;
  emptyStateSize?: string;
  componentType?: string;
  optAddItem?: (_e: MouseEvent<HTMLDivElement>) => void;
  useTableFilter?: boolean;
};
