import { IPagenationSetter } from '@hooks/tableHook';
import { SetStateAction } from 'react';

export type ITableBody = {
  [x: string]: string | number | string[] | number[] | boolean | any;
};

export type ITableHead<TData> = {
  label: string;
  accessor: keyof TData | '' | null;
  align?: string;
  render?: (_data: TData) => React.ReactNode;
};

export type ITableProp = {
  tableHeads?: {
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
  statusOptionMenu?: boolean;
  changeTextStyle?: boolean;
  tableLoader?: React.ReactNode;
  tableEmptyState?: React.ReactNode;
  emptyStateSize?: string;
};
