export type ICustomPagination = {
  startIndex: number;
  endIndex: number;
  lengthOfData: number;
  currentPage: number;
  onChangeOfPage?: (_page: number) => void;
  onChangeofPageSize?: (_val: number) => void;
};
