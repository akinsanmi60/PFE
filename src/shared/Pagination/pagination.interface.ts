export type IPagination = {
  startIndex: number;
  endIndex: number;
  lengthOfData: number;
  currentPage: number;
  onChangeOfPage?: (_page: number) => void;
};
