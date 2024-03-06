export type IRowBody = {
  [x: string]: string | number | string[] | number[] | boolean | any;
};

export type IHubProp = {
  dataBody: IRowBody[];
  currentPage?: number;
  setCurrentPage?: (_page: number) => void;
  total?: number;
  page_size?: number;
  showPagination?: boolean;
  loading?: boolean;
  tableLoader?: React.ReactNode;
  tableEmptyState?: React.ReactNode;
  onRowClick?: (_rowData: IRowBody) => void;
  setLimit?: (_limit: number) => void;
};
