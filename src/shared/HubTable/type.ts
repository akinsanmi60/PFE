export type IRowBody = {
  [x: string]: string | number | string[] | number[] | boolean | any;
};

export type IHubProp<TData> = {
  dataBody: TData[];
  currentPage?: number;
  setCurrentPage?: (_page: number) => void;
  total?: number;
  page_size?: number;
  showPagination?: boolean;
  loading?: boolean;
  tableLoader?: React.ReactNode;
  tableEmptyState?: React.ReactNode;
  onRowClick?: (_rowData: TData) => void;
  setLimit?: (_limit: number) => void;
};
