import { SetStateAction } from 'react';

export type ITableBody = {
  [x: string]: string | number | string[] | number[] | boolean | any;
};

export type ITableHead<TData> = {
  label: string;
  accessor: keyof TData | '' | null | number;
  align?: string;
  render?: (_data: TData) => React.ReactNode;
  sticky?: boolean;
  stickyTo?: 'left' | 'right';
};

export type ITableProp<TData> = {
  tableHeads?: ITableHead<TData>[];
  showMenu?: boolean;
  dataTableSource?: TData[];
  showPagination?: boolean;
  clickRow?: boolean;
  pathTo?: string;
  showDivider?: boolean;
  onMenuClick?: (_textType: TData) => void;
  onRowClick?: (data: any) => typeof data;
  rowDetailCollector?: React.Dispatch<SetStateAction<TData>>;
  page_size?: number;
  handlePageChange?: number;
  total_pages?: number;
  total?: number;
  loading?: boolean | string;
  menuOptions?: {
    menuTitle: string;
    action: (_agentId: TData) => void;
  }[];
  statusOptionMenu?: boolean;
  changeTextStyle?: boolean;
  tableLoader?: React.ReactNode;
  tableEmptyState?: React.ReactNode;
  emptyStateSize?: string;
  setCurrentPage?: (_page: number) => void;
  current_page?: number;
  setLimit?: (_limit: number) => void;
  children?: React.ReactNode;
};
