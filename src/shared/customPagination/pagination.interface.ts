export type ICustomPagination = {
  startIndex: number;
  endIndex: number;
  lengthOfData: number;
  currentPage: number;
  limit?: number;
  onChangeOfPage?: (_page: number) => void;
  onChangeofPageSize?: (_val: number) => void;
  paginationArray?: number[];
};
